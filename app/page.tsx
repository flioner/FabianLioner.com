"use client";
import { useState, useRef, useEffect } from "react";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Experience from "./components/experience/experience";
import ColorBlob from "./components/threejs/optimizedLanding";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// @ts-ignore
import { Mousewheel } from "swiper";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const swiperRef = useRef<any>(null);

  // Check if the environment is a browser
  useEffect(() => {
    // Check if navigator is available (client-side)
    if (typeof navigator !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }

    // Retrieve the saved slide index from localStorage or default to 0
    const savedIndex = localStorage.getItem("currentSlideIndex");
    setCurrentSection(savedIndex ? parseInt(savedIndex) : 0);
  }, []);

  // Set up the Swiper instance and its event listeners
  useEffect(() => {
    if (swiperRef.current) {
      // Set the initial slide and mark Swiper as ready
      swiperRef.current.slideTo(currentSection, 0); // Set to slide without transition
      const handleSlideChange = () => {
        if (swiperRef.current) {
          const newIndex = swiperRef.current.activeIndex;
          setCurrentSection(newIndex);
          // Save the current slide index to localStorage
          localStorage.setItem("currentSlideIndex", newIndex.toString());
        }
      };

      swiperRef.current.on("slideChange", handleSlideChange);

      return () => {
        swiperRef.current.off("slideChange", handleSlideChange);
      };
    }
  }, [currentSection]);

  const handleNavbarClick = (section: string) => {
    let slideIndex = 0;
    switch (section) {
      case "aboutme":
        slideIndex = 1;
        break;
      case "projects":
        slideIndex = 2;
        break;
      case "experience":
        slideIndex = 3;
        break;
      default:
        break;
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  return (
    <main>
      <div className={s.responsiveness}>
        <Draggable
          disabled={isPinned}
          position={position}
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
          <div className={s.navbar}>
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
              onClick={() => handleNavbarClick("projects")}
            >
              <div
                className={
                  currentSection === 2 ? s.navBtnTxtCurrent : s.navBtnTxt
                }
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
                className={
                  currentSection === 3 ? s.navBtnTxtCurrent : s.navBtnTxt
                }
              >
                Experience
              </div>
              <div className={s.navBtnTxtC}>Experience</div>
            </div>
          </div>
        </Draggable>
      </div>

      <Swiper
        className={s.slider}
        direction={"vertical"}
        speed={isMobile ? 200 : 700} // Adjust speed based on device
        mousewheel={true}
        modules={[Mousewheel]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.slideTo(currentSection, 0); // Immediate transition
        }}
      >
        <SwiperSlide>
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
            <div className={s.bgBlobColor}>
              <ColorBlob />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={s.projectSection}>
          <AboutMe />
        </SwiperSlide>

        <SwiperSlide className={s.projectSection}>
          <Projects />
        </SwiperSlide>

        <SwiperSlide className={s.projectSection}>
          <Experience />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
