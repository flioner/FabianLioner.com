"use client";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import { useState } from "react";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import ColorBlob from "./components/threejs/grainybgcolor";

import ReactFullpage from "@fullpage/react-fullpage";
import { any } from "three/examples/jsm/nodes/Nodes.js";

// Navbar component, receiving fullpageApi as a prop
const Navbar = ({
  fullpageApi,
  currentSection,
}: {
  fullpageApi: any;
  currentSection: number;
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleNavbarClick = (section: string) => {
    switch (section) {
      case "aboutme":
        fullpageApi.moveTo(2); // Move to the "About Me" section
        break;
      case "projects":
        fullpageApi.moveTo(3); // Move to the "Projects" section
        break;
      case "experience":
        fullpageApi.moveTo(4); // Move to the "Experience" section
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Draggable
        disabled={isPinned}
        position={position}
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        <div className={showNavbar ? s.navbar : s.hiddenNav}>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("aboutme")}
          >
            <div
              className={currentSection == 1 ? s.navBtnTxtCurrent : s.navBtnTxt}
            >
              About Me
            </div>
            <div className={s.navBtnTxtC}>About Me</div>
          </div>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("projects")}
          >
            <div
              className={currentSection == 2 ? s.navBtnTxtCurrent : s.navBtnTxt}
            >
              Projects
            </div>
            <div className={s.navBtnTxtC}>Projects</div>
          </div>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("experience")}
          >
            <div
              className={currentSection == 3 ? s.navBtnTxtCurrent : s.navBtnTxt}
            >
              Experience
            </div>
            <div className={s.navBtnTxtC}>Experience</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [fullpageApi, setFullpageApi] = useState<any>(null);

  return (
    <main>
      <div className="App">
        {/* Navbar is outside ReactFullpage */}
        {fullpageApi && (
          <Navbar fullpageApi={fullpageApi} currentSection={currentSection} />
        )}

        <ReactFullpage
          credits={{ enabled: false }}
          afterLoad={(origin, destination) => {
            setCurrentSection(destination.index);
          }}
          render={({ fullpageApi: api }) => {
            if (!fullpageApi) {
              setFullpageApi(api);
            }
            return (
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
                  <div className={s.projectSection}>
                    <AboutMe />
                  </div>
                </div>

                <div className="section">
                  <div className={s.projectSection}>
                    <Projects />
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </main>
  );
}
