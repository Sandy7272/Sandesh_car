import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Capabilities from "@/components/Capabilities";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

const Index = () => (
  <>
    <CustomCursor />
    <ScrollProgress />
    <Header />
    <Hero />
    <Marquee />
    <Work />
    <Capabilities />
    <StatsBar />
    <About />
    <Experience />
    <Clients />
    <Contact />
    <Footer />
  </>
);

export default Index;
