// Global styles first, so component (module) styles can override them.
import "./styles/global.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandMarquee from "./components/BrandMarquee";
import Services from "./components/Services";
import Work from "./components/Work";
import WhyPdr from "./components/WhyPdr";
import Process from "./components/Process";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Areas from "./components/Areas";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { useReveal } from "./hooks/useReveal";
import { useLeadTracking } from "./hooks/useLeadTracking";

export default function App() {
  useReveal();
  useLeadTracking();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <BrandMarquee />
        <Services />
        <Work />
        <WhyPdr />
        <Process />
        <About />
        <Reviews />
        <Areas />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
