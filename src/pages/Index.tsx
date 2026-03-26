import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Work from "@/components/Work";
import Marquee from "@/components/Marquee";
import CaseStudies from "@/components/CaseStudiesModern";
import ModelShowcase from "@/components/ModelShowcase";
import HowIBuild from "@/components/HowIBuild";
import Capabilities from "@/components/Capabilities";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => (
  <SmoothScroll>
    <CustomCursor />
    <Header />
    <Hero />
    <Marquee />
    <Work />
    <Experience />
    <HowIBuild />
    <BentoGrid />
    <CaseStudies />
    <ModelShowcase />
    <Capabilities />
    <StatsBar />
    <About />
    <Clients />
    <Contact />
    <Footer />
  </SmoothScroll>
);

export default Index;
