import FeaturedRides from "@/components/FeatureRides";
import NewsletterSignup from "@/components/NewsletterSignup";
import SearchRideHero from "@/components/SearchRideHero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <SearchRideHero />
      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <FeaturedRides />
        </div>
      </section>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <Testimonials />
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container max-w-md mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
