import SearchRouteForm from "../SearchRouteForm";

export default function SearchRideHero() {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      {/* Background with ride-sharing theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="rideshare-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="1" fill="currentColor" className="text-primary/20" />
                <path
                  d="M 50 100 Q 100 50 150 100"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  className="text-secondary/20"
                />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#rideshare-pattern)" />
          </svg>
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4">
        <SearchRouteForm />
      </div>
    </section>
  );
}
