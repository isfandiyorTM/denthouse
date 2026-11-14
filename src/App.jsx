// Global styles first, so component (module) styles can override them.
import "./styles/global.css";
import { I18nProvider } from "./i18n/context";
import { getT } from "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import AreasMarquee from "./components/AreasMarquee";
import Benefits from "./components/Benefits";
import Services from "./components/Services";
import Process from "./components/Process";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileBar from "./components/MobileBar";
import { useLeadTracking } from "./hooks/useLeadTracking";
import { useReveal } from "./hooks/useReveal";

export default function App({ lang }) {
  useLeadTracking();
  useReveal();

  return (
    <I18nProvider lang={lang}>
      <a href="#main" className="skip-link">{getT(lang).skip}</a>
      <Navbar />
      <main id="main">
        <Hero />
        <AreasMarquee />
        <Benefits />
        <Work />
        <Services />
        <Process />
        <About />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </I18nProvider>
  );
}
