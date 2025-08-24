"use client";
import { useState, useRef, useEffect } from "react";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Experience from "./components/experience/experience";
import MetaballsPage from "./components/threejs/metaballsOptimized";
import Education from "./components/education/education";
import Mouse from "./components/mouse/mouse";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of section refs
  const isScrolling = useRef(false); // Used to debounce the scroll behavior
  const sections = [
    "landing",
    "aboutme",
    "experience",
    "projects",
    "education",
  ];
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // Timeout reference for debouncing
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    // Intersection Observer to detect which section is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setCurrentSection(index);
          }
        });
      },
      { threshold: 0.7 } // Adjust the threshold to determine when the section is considered in view
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavbarClick = (section: string) => {
    const index = sections.indexOf(section);
    const targetSection = sectionRefs.current[index];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <div className={s.responsiveness}>
        <div className={!isMobile ? s.navbar : s.hidden}>
          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("aboutme")}
          >
            <div
              className={
                currentSection === 1 ? s.navBtnTxtCurrent : s.navBtnTxt
              }
            >
              About Me
            </div>
            <div className={s.navBtnTxtC}>About Me</div>
          </div>

          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("experience")}
          >
            <div
              className={
                currentSection === 2 ? s.navBtnTxtCurrent : s.navBtnTxt
              }
            >
              Experience
            </div>
            <div className={s.navBtnTxtC}>Experience</div>
          </div>

          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("projects")}
          >
            <div
              className={
                currentSection === 3 ? s.navBtnTxtCurrent : s.navBtnTxt
              }
            >
              Projects
            </div>
            <div className={s.navBtnTxtC}>Projects</div>
          </div>

          <div
            className={s.navBtn}
            onClick={() => handleNavbarClick("education")}
          >
            <div
              className={
                currentSection === 4 ? s.navBtnTxtCurrent : s.navBtnTxt
              }
            >
              Education
            </div>
            <div className={s.navBtnTxtC}>Education</div>
          </div>
        </div>
      </div>

      <div className={s.bgBlobColorCont}>
        <div className={s.bgBlobColor}>
          <div className={s.texture} />
          <MetaballsPage />
        </div>
      </div>

      <div className={s.mainCont}>
        <div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className={s.projectSection2}
        >
          <div className={s.landing}>
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

        <div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className={s.projectSection}
        >
          <AboutMe />
        </div>

        <div
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className={s.projectSection}
        >
          <Experience />
        </div>

        <div
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          className={s.projectSection2}
        >
          <Projects />
        </div>

        <div
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          className={s.projectSection2}
        >
          <Education />
        </div>
      </div>
      <Mouse />
    </main>
  );
}
