import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { resume } from "../data/resume";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href={resume.links.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — sandesh-gadakh
              </a>
            </p>
            <p>
              <a href={`mailto:${resume.email}`} data-cursor="disable">
                {resume.email}
              </a>
            </p>
            <p>
              <a href={`tel:${resume.phone.replace(/[^+\d]/g, "")}`} data-cursor="disable">
                {resume.phone}
              </a>
            </p>
            <h4>Education</h4>
            {resume.education.map((ed) => (
              <p key={`${ed.title}-${ed.when}`}>
                {ed.title}, {ed.org} — {ed.when}
              </p>
            ))}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Sandy7272"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href={resume.links.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/sandesh_gadakh/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Sandesh Gadakh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
