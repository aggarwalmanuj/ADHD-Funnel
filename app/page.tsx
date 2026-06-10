import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Credibility from "@/components/Credibility";
import Pain from "@/components/Pain";
import RealCost from "@/components/RealCost";
import FourWeeks from "@/components/FourWeeks";
import Testimonials from "@/components/Testimonials";
import Differentiation from "@/components/Differentiation";
import HowItWorks from "@/components/HowItWorks";
import Fit from "@/components/Fit";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Credibility />
      <Pain />
      <RealCost />
      <FourWeeks />
      <Testimonials />
      <Differentiation />
      <HowItWorks />
      <Fit />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
