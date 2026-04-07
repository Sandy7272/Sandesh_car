import { useEffect, useRef } from "react";
import "./styles/Career.css";
import { resume } from "../data/resume";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the timeline line growing downwards
      gsap.to(".career-timeline-line", {
        scrollTrigger: {
          trigger: ".career-info",
          start: "top 60%", // Start growing when the container hits 60% viewport
          end: "bottom 60%", // Finish growing when the bottom hits 60% viewport
          scrub: 1, // Smooth scrub
        },
        height: "100%",
        ease: "none",
      });

      // 2. Animate each box fading in and sliding up
      const boxes = gsap.utils.toArray(".career-info-box");
      boxes.forEach((box: any) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: "top 85%", // Start fading in when the box is 85% down viewport
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // 3. Highlight the dot as the scroll passes it
        gsap.to(box.querySelector(".career-dot"), {
          scrollTrigger: {
            trigger: box,
            start: "top 60%", // Matches the timeline line progress
            toggleActions: "play none none reverse",
          },
          scale: 1.3,
          backgroundColor: "var(--accentColor)",
          borderColor: "var(--accentColor)",
          boxShadow: "0px 0px 15px 2px rgba(94, 234, 212, 0.6)",
          duration: 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="experience" ref={containerRef}>
      <div className="career-container">
        <h2>
          Work <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          {/* The Vertical Timeline Track */}
          <div className="career-timeline-container">
            <div className="career-timeline-line"></div>
          </div>
          
          {resume.experience.map((job, index) => (
            <div className="career-info-box" key={`${job.company}-${index}`}>
              {/* Dot mapping to the timeline */}
              <div className="career-dot"></div>
              
              <div className="career-info-content">
                <div className="career-role-header">
                  <h3>{job.role}</h3>
                  <h4>{job.company}</h4>
                  <span className="career-when">{job.when}</span>
                </div>
                <ul className="career-highlights">
                  {job.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
