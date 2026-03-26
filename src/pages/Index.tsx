import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CaseStudies from "@/components/CaseStudies";
import ModelShowcase from "@/components/ModelShowcase";
import HowIBuild from "@/components/HowIBuild";
import Capabilities from "@/components/Capabilities";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => (
  <SmoothScroll>
    <CustomCursor />
    <ScrollProgress />
    <Header />
    <Hero />
    <Marquee />
    <CaseStudies />
    <ModelShowcase />
    <HowIBuild />
    <Capabilities />
    <StatsBar />
    <About />
    <Experience />
    <Clients />
    <Contact />
    <Footer />
  </SmoothScroll>
);

export default Index;
