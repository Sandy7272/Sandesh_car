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
      gsap.to(".career-timeline-line", {
        scrollTrigger: {
          trigger: ".career-info",
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
        height: "100%",
        ease: "none",
      });

      const boxes = gsap.utils.toArray(".career-info-box");
      boxes.forEach((box: any) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(box.querySelector(".career-dot"), {
          scrollTrigger: {
            trigger: box,
            start: "top 60%",
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
        {/* Section header */}
        <div className="career-header">
          <span className="career-kicker">Career Journey</span>
          <h2>
            Work <span>&</span>
            <br /> Experience
          </h2>
          <p className="career-header-sub">
            From 3D artist to full-stack technologist — building at the intersection of design, code, and AI.
          </p>
        </div>

        {/* Stats bar */}
        <div className="career-stats-bar">
          <div className="career-stat-item">
            <span className="career-stat-num">4+</span>
            <span className="career-stat-label">Years Experience</span>
          </div>
          <div className="career-stat-divider" />
          <div className="career-stat-item">
            <span className="career-stat-num">3</span>
            <span className="career-stat-label">Companies</span>
          </div>
          <div className="career-stat-divider" />
          <div className="career-stat-item">
            <span className="career-stat-num">100+</span>
            <span className="career-stat-label">Projects Delivered</span>
          </div>
          <div className="career-stat-divider" />
          <div className="career-stat-item">
            <span className="career-stat-num">40%</span>
            <span className="career-stat-label">Pipeline Speedup</span>
          </div>
        </div>

        <div className="career-info">
          <div className="career-timeline-container">
            <div className="career-timeline-line"></div>
          </div>

          {resume.experience.map((job, index) => (
            <div className="career-info-box" key={`${job.company}-${index}`}>
              <div className="career-dot">
                <div className="career-dot-ring" />
              </div>

              <div className="career-info-content">
                <div className="career-role-header">
                  <span className="career-when">{job.when}</span>
                  <h3>{job.role}</h3>
                  <h4>{job.company}</h4>
                </div>
                <ul className="career-highlights">
                  {job.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                {/* Skill tags derived from highlights */}
                <div className="career-skill-tags">
                  {getSkillTags(index).map((tag) => (
                    <span className="career-skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getSkillTags(jobIndex: number): string[] {
  const tagSets = [
    ["React", "Three.js", "NeRF", "BabylonJS", "AI/ML", "Product"],
    ["Blender", "After Effects", "3D Pipeline", "Motion Graphics", "Team Lead"],
    ["Gaussian Splatting", "WebGL", "Photogrammetry", "Full Stack"],
  ];
  return tagSets[jobIndex] || tagSets[tagSets.length - 1];
}

export default Career;
