import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

import { useLoading } from "../context/LoadingProvider";

const Navbar = () => {
  const { isLoading } = useLoading();

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    
    // Only pause if we are in the initial loading state
    if (isLoading) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
      document.body.style.overflowY = "auto";
      document.getElementsByTagName("main")[0]?.classList.add("main-active");
    }

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (smoother) {
        smoother.kill();
      }
    };
  }, [isLoading]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    if (window.innerWidth > 1024) {
      e.preventDefault();
      if (smoother) {
        smoother.scrollTo(section, true, "top top");
      }
    }
  };
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SG
        </a>
        <a
          href="https://www.linkedin.com/in/sandesh-gadakh-41863b210/"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/sandesh-gadakh
        </a>
        <ul>
          <li>
            <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work" onClick={(e) => handleScroll(e, "#work")}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
