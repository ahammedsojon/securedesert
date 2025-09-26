import Hero from "@/sections/Hero";
import Stats from "@/sections/Stats";
import Features from "@/sections/Features";
import Partners from "@/sections/Partners";
import Final from "@/sections/Final";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Partners />
      <Testimonials />
      <FAQ />
      <Final />
      <Footer />
    </main>
  );
}
