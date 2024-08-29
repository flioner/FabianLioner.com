"use client";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import { useState } from "react";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Blob from "./components/threejs/grainybg";
import ColorBlob from "./components/threejs/grainybgcolor";

export default function Home() {
  /* Beginning of Navbar Logic */
  const [showSettings, setShowSettings] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [isTop, setIsTop] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleCenterButtonClick = ({ selection }: { selection: string }) => {
    if (selection == "top") {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
    setPosition({ x: 0, y: 0 });
  };
  /* End of Navbar Logic */

  return (
    <main>
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
            <div className={s.navBtn}> About me</div>
            <div className={s.navBtn}> Projects</div>
            <div className={s.navBtn}> Experience</div>
          </div>
        </Draggable>
      </div>

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
        <div className={s.bgBlobColor}>
          <ColorBlob />
        </div>
      </div>

      <div className={s.projectSection}>
        <AboutMe />
      </div>
    </main>
  );
}

// <Projects />
