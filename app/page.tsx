"use client";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import { useState } from "react";
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

      <div /* NAVBAR */>
        <Draggable
          disabled={isPinned}
          position={position} // Set position dynamically
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })} // Update position on drag stop
        >
          <div
            className={showNavbar ? (isTop ? s.navbarTop : s.navbar) : s.hidden}
          >
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
                onClick={() => handleCenterButtonClick({ selection: "top" })} // Call handleCenterButtonClick on click
                className={showSettings ? s.navBtn2 : s.hidden}
              >
                Top
              </div>
              <div
                onClick={() => handleCenterButtonClick({ selection: "bottom" })} // Call handleCenterButtonClick on click
                className={showSettings ? s.navBtn2 : s.hidden}
              >
                Bottom
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
        <img
          onClick={() => console.log("navbar menu")}
          className={s.menu}
          src="icons/menu.png"
        />
      </div>
    </main>
  );
}
