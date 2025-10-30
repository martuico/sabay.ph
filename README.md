# 🚗 Sabay.ph — Carpooling Made Simple

**Sabay.ph** is a community-driven carpooling web app built for the Philippines 🇵🇭.
It helps passengers and drivers share rides efficiently — saving time, money, and the planet 🌱.

---

## ✨ Features (MVP)
- 🔐 User authentication (Driver / Passenger)
- 🚘 Create and view routes (driver-managed)
- 🧭 Request rides with pickup/drop-off points
- 💬 Negotiate pickup zones
- 💸 Smart fare estimation
- 🔔 Real-time updates (driver ↔ passenger)
- 📍 Interactive map for route planning (Mapbox)

---

## 🧱 Tech Stack
| Purpose | Tech |
|----------|------|
| Framework | [Next.js 15 (App Router)](https://nextjs.org/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | PostgreSQL |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com) |
| Auth | [NextAuth.js](https://authjs.dev/) |
| Maps | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) |
| Realtime | Socket.io or Pusher (planned) |
| Validation | [Zod](https://zod.dev/) |
| Hosting | [Vercel](https://vercel.com/) + [Neon.tech](https://neon.tech/) |

---

## 📂 Folder Structure
src/
└─ app/
├─ (auth)/ # Login / register pages
├─ dashboard/ # User overview
├─ rides/ # Passenger requests
├─ routes/ # Driver routes CRUD
├─ api/ # API route handlers
├─ components/ # Shared UI components
├─ lib/ # DB, sockets, and helpers
└─ styles/ # Global CSS



---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/martuico/sabay.ph.git
cd sabay.ph
```

### 2. Install dependencies
pnpm install


### 3. Setup environment variables
Create a .env file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/sabay"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
MAPBOX_ACCESS_TOKEN="your-mapbox-key"
```


### 4. Setup database
```
pnpm prisma:generate
pnpm prisma:push
```

### 5. Run server

```
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000)

## Roadmap
- [ ] Passenger ride requests and negotiations
- [ ] Real-time trip tracking via Socket.io
- [ ] Payment gateway (Stripe / PayMongo)
- [ ] Mobile PWA support
- [ ] Driver verification system
- [ ] AI-based route matching (stretch goal)

## Contributing

- Fork the repo
- Create a feature branch
- Submit a pull request 🚀

### We’re open to contributions for:
- UI/UX improvements
- Map-based routing logic
- Payment & wallet system
- Admin dashboard

## Inspiration

GrabCar and Angkas solved ridesharing, but Sabay.ph focuses on community carpooling — reducing traffic, costs, and emissions by matching neighbors going the same way. 🌏

“Sabay tayo, sama ka na!” – The spirit of Filipino carpooling 🇵🇭
