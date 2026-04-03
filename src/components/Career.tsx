import "./styles/Career.css";
import { resume } from "../data/resume";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          {resume.experience.map((job) => (
            <div className="career-info-box" key={`${job.company}-${job.role}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{job.role}</h4>
                  <h5>{job.company}</h5>
                </div>
                <h3>{job.when}</h3>
              </div>
              <p>{job.highlights[0]}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Career;
