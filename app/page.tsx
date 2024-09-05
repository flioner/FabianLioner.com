"use client";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import { useState, useRef } from "react";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Blob from "./components/threejs/grainybg";
import ColorBlob from "./components/threejs/grainybgcolor";

import ReactFullpage from "@fullpage/react-fullpage";

export default function Home() {
  /* Beginning of Navbar Logic */
  const [showSettings, setShowSettings] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [isTop, setIsTop] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Create refs for each section
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleNavbarClick = (section: string) => {
    switch (section) {
      case "aboutme":
        aboutMeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "experience":
        // Implement scrolling for Experience section if it exists
        break;
      default:
        break;
    }
  };

  return (
    <main>
      <div className="App">
        <div /* NAVBAR */>
          <Draggable
            disabled={isPinned}
            position={position} // Set position dynamically
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })} // Update position on drag stop
          >
            <div
              className={
                showNavbar ? (isTop ? s.navbarTop : s.navbar) : s.hiddenNav
              }
            >
              <div
                className={s.navBtn}
                onClick={() => handleNavbarClick("aboutme")}
              >
                <div className={s.navBtnTxt}> About me</div>
              </div>
              <div
                className={s.navBtn}
                onClick={() => handleNavbarClick("projects")}
              >
                <div className={s.navBtnTxt}> Projects</div>
              </div>
              <div
                className={s.navBtn}
                onClick={() => handleNavbarClick("experience")}
              >
                <div className={s.navBtnTxt}> Experience</div>
              </div>
            </div>
          </Draggable>
        </div>
        <ReactFullpage
          credits={{ enabled: false }}
          render={(comp) => (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div /* Landing Page */ className={s.landing}>
                  <div className={s.name}> Fabian Lioner</div>

                  <Typewriter
                    options={{
                      strings: [
                        "Front-End Development",
                        "Web Design",
                        "Full-Stack Development",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </div>

              <div className={s.bgBlobColor}>
                <ColorBlob />
              </div>

              <div className="section">
                <div className={s.projectSection} ref={aboutMeRef}>
                  <AboutMe />
                </div>
              </div>

              <div className="section">
                <div className={s.projectSection} ref={projectsRef}>
                  <Projects />
                </div>
              </div>
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    </main>
  );
}
