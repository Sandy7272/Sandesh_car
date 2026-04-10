import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SANDESH
              <br />
              <span>GADAKH</span>
            </h1>
            <div className="landing-ctas">
              <a
                href="#work"
                className="landing-cta-primary"
                onClick={handleViewWork}
                data-cursor="disable"
              >
                View My Work
              </a>
              <a
                href="/resume.html"
                className="landing-cta-secondary"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>Technologist &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">3D Artist</div>
              <div className="landing-h2-2">Product</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Product</div>
              <div className="landing-h2-info-1">3D Artist</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
