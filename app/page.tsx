"use client";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import { useState } from "react";
export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track position

  const handleCenterButtonClick = () => {
    setPosition({ x: 0, y: 0 }); // Set position to center
  };

  return (
    <main>
      <div className={s.landing}>
        <div className={s.bg}>
          <MetaballsPage />
        </div>
        <div className={s.name}> Fabián Lióner</div>

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

      <Draggable
        disabled={isPinned}
        position={position} // Set position dynamically
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })} // Update position on drag stop
      >
        <div className={showNavbar ? s.navbar : s.hidden}>
          <div className={s.navBtn}> About me</div>
          <div className={s.navBtn}> Projects</div>
          <div className={s.navBtn}> Experience</div>
          <div className={s.navBtn}>
            <img
              className={s.icon}
              onClick={() => setShowSettings(!showSettings)}
              src="icons/settings.png"
            />
            <div
              onClick={() => setIsPinned(!isPinned)}
              className={showSettings ? s.navBtn2 : s.hidden}
            >
              {isPinned ? "Unpin" : "Pin"}
            </div>
            <div
              onClick={handleCenterButtonClick} // Call handleCenterButtonClick on click
              className={showSettings ? s.navBtn2 : s.hidden}
            >
              Center
            </div>
            <div className={showSettings ? s.navBtn2 : s.hidden}>
              <img
                className={s.icon}
                onClick={() => setShowNavbar(false)}
                src="icons/hide.png"
              />
            </div>
          </div>
        </div>
      </Draggable>
      <img
        onClick={() => setShowNavbar(true)}
        className={showNavbar ? s.hidden : s.show}
        src="icons/show.png"
      />
    </main>
  );
}
