import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Credibility from "@/components/Credibility";
import Pain from "@/components/Pain";
import HowItWorks from "@/components/HowItWorks";
import Differentiation from "@/components/Differentiation";
import Testimonials from "@/components/Testimonials";
import Fit from "@/components/Fit";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Nav />
      <Hero />
      <Credibility />
      <Pain />
      <HowItWorks />
      <Differentiation />
      <Testimonials />
      <Fit />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
