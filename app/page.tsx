"use client";
import { useState, useRef, useEffect } from "react";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Experience from "./components/experience/experience";
import ColorBlob from "./components/threejs/optimizedLanding";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }
  }, []);

  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const handleNavbarClick = (section: string) => {
    switch (section) {
      case "aboutme":
        aboutMeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "experience":
        experienceRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <main>
      <div className={s.responsiveness}>
        <div className={isMobile ? s.navbar : s.hidden}>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("aboutme")}
          >
            <div className={false ? s.navBtnTxtCurrent : s.navBtnTxt}>
              About Me
            </div>
            <div className={s.navBtnTxtC}>About Me</div>
          </div>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("projects")}
          >
            <div className={false ? s.navBtnTxtCurrent : s.navBtnTxt}>
              Projects
            </div>
            <div className={s.navBtnTxtC}>Projects</div>
          </div>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("experience")}
          >
            <div className={false ? s.navBtnTxtCurrent : s.navBtnTxt}>
              Experience
            </div>
            <div className={s.navBtnTxtC}>Experience</div>
          </div>
        </div>
      </div>

      <div className={s.bgBlobColor}>
        <ColorBlob />
      </div>

      <div className={s.mainCont}>
        <div className={s.projectSection2}>
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

        <div ref={aboutMeRef} className={s.projectSection}>
          <AboutMe />
        </div>

        <div ref={projectsRef} className={s.projectSection2}>
          <Projects />
        </div>

        <div ref={experienceRef} className={s.projectSection}>
          <Experience />
        </div>
      </div>
    </main>
  );
}
