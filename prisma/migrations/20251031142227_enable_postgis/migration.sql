-- 20251031124500_enable_postgis/migration.sql

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Your normal Prisma schema changes below
-- e.g.
-- CREATE TABLE "Place" (
--   "id" SERIAL PRIMARY KEY,
--   "name" TEXT,
--   "location" GEOGRAPHY(Point, 4326)
-- );
