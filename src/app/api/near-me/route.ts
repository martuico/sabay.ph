import { getGridsInRadius, haversineDistance } from "@/lib/grid";
import Redis from "ioredis";
import { MeiliSearch } from "meilisearch";

const redis = new Redis(process.env.REDIS_URL);
const meili = new MeiliSearch({ host: process.env.MEILISEARCH_URL! });
const CACHE_TTL = 60 * 5; // 5 minutes

// Main endpoint
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = Number.parseFloat(url.searchParams.get("lat")!);
  const lng = Number.parseFloat(url.searchParams.get("lng")!);
  const radius = Number.parseInt(url.searchParams.get("radius") || "5000"); // meters
  const q = url.searchParams.get("q") || "";
  const radiusKm = radius / 1000;

  const grids = getGridsInRadius(lat, lng, radiusKm);
  let ids: string[] = [];

  // 1️⃣ Try fetching cached IDs from all grids
  const pipeline = redis.pipeline();
  grids.forEach((grid) => pipeline.get(`near:${grid}:${q}`));
  const results = await pipeline.exec();

  results.forEach(([err, value]: any) => {
    if (!err && value) ids.push(...JSON.parse(value));
  });
  ids = [...new Set(ids)]; // deduplicate

  // 2️⃣ Cache miss → query Meilisearch
  if (ids.length === 0) {
    const searchResult = await meili.index("locations").search(q, {
      limit: 100,
      aroundLatLng: `${lat},${lng}`,
      aroundRadius: radius,
    });
    ids = searchResult.hits.map((hit: any) => hit.id.toString());

    if (ids.length === 0) {
      return new Response(JSON.stringify([]), { headers: { "Content-Type": "application/json" } });
    }

    // Cache results per grid
    const cachePipeline = redis.pipeline();
    grids.forEach((grid) => cachePipeline.set(`near:${grid}:${q}`, JSON.stringify(ids), "EX", CACHE_TTL));
    await cachePipeline.exec();
  }

  // 3️⃣ Fetch full documents
  const docs = await meili.index("locations").getDocuments({
    filter: `id IN [${ids.join(",")}]`,
    limit: 100,
  });

  // 4️⃣ Exact distance filter & sort
  const filtered = docs.hits
    .map((hit: any) => ({
      ...hit,
      distance: haversineDistance(lat, lng, hit._geo.lat, hit._geo.lng),
    }))
    .filter((hit: any) => hit.distance <= radiusKm)
    .sort((a: any, b: any) => a.distance - b.distance);

  // 5️⃣ Return minimal payload
  return new Response(
    JSON.stringify(
      filtered.map((hit: any) => ({
        id: hit.id,
        name: hit.name,
        lat: hit._geo.lat,
        lng: hit._geo.lng,
        distance: hit.distance,
      })),
    ),
    { headers: { "Content-Type": "application/json" } },
  );
}
