import React, { useState } from "react";
import "./About.css";

const About = () => {

  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Image */}
          <div className="col-md-4 mb-4 mb-md-0">
            <img
              src="https://res.cloudinary.com/dailyjoy/image/upload/v1704300023/about%20pic.png"
              alt="about"
              className="img-fluid rounded"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

          {/* Content */}
          <div className="col-md-8">

            <h1 className="sub-title">About Me</h1>

            <p id="about-paragraph">
              Hello, I'm Aanchal Goyal, a highly skilled Graphics and UI/UX Designer based in Ramnagar, Uttarakhand, India, with over 4 years of experience in crafting impactful visual experiences. Passionate about bringing creativity to life in every design project, I specialize in translating ideas into visually compelling graphics and user-centric interfaces. Let's collaborate to elevate your brand through innovative and captivating design solutions!
            </p>

            {/* Tabs */}
            <div className="tab-titles d-flex">
              <p
                className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </p>

              <p
                className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
                onClick={() => setActiveTab("education")}
              >
                Education
              </p>

              <p
                className={`tab-links ${activeTab === "experience" ? "active-link" : ""}`}
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </p>
            </div>

            {/* Skills */}
            {activeTab === "skills" && (
              <div className="tab-contents active-tab">
                <ul>
                  <li>
                    <span>Graphic Designing</span><br/>
                    Transforming creativity into captivating graphic designs.
                  </li>

                  <li>
                    <span>UI/UX Designing</span><br/>
                    Crafting user-centric UI/UX designs.
                  </li>

                  <li>
                    <span>Logo Designing</span><br/>
                    Transform ideas into impactful logos.
                  </li>
                </ul>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div className="tab-contents active-tab">
                <ul>
                  <li>
                    <span>2016 - 2019</span><br/>
                    Bachelors in Design & Animation
                  </li>

                  <li>
                    <span>2016</span><br/>
                    Intermediate certification
                  </li>
                </ul>
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="tab-contents active-tab">
                <ul>
                  <li>
                    <span>2021 - Present</span><br/>
                    Designer at Optus
                  </li>

                  <li>
                    <span>2020 - 2023</span><br/>
                    Graphics Designer at COXCO
                  </li>

                  <li>
                    <span>2020 - 2022</span><br/>
                    Graphics Designer at Startupmed
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;