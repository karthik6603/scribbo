import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="space-y-12">
      <Navbar />
      <Hero />
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Latest Stories
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover amazing stories from our community of writers. From tech
            insights to personal journeys, find content that inspires and
            informs.
          </p>
        </div>
        <Footer />
      </section>
    </div>
  );
}
