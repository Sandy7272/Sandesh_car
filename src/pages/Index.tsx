import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => (
  <SmoothScroll>
    <div className="grain" />
    <CustomCursor />
    <Header />
    <Hero />
    <Marquee />
    <Work />
    <Capabilities />
    <Experience />
    <About />
    <Contact />
    <Footer />
  </SmoothScroll>
);

export default Index;
