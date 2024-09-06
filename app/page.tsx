"use client";
import { useState, useRef, useEffect } from "react";
import s from "./page.module.css";
import Typewriter from "typewriter-effect";
import Draggable from "react-draggable";
import Projects from "./components/projects/projects";
import AboutMe from "./components/aboutme/aboutme";
import Experience from "./components/experience/experience";
import ColorBlob from "./components/threejs/grainybgcolor";
import { Swiper, SwiperSlide, Swiper as SwiperType } from "swiper/react";
import "swiper/css";
// @ts-ignore
import { Mousewheel, Swiper as SwiperInstance } from "swiper";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState<number>(() => {
    // Retrieve the saved slide index from localStorage or default to 0
    const savedIndex = localStorage.getItem("currentSlideIndex");
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const transitionSpeed = isMobile ? 300 : 700;

  // Create a ref to hold the Swiper instance
  const swiperRef = useRef<SwiperInstance | null>(null);

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

  // Update currentSection when slide changes and save to localStorage
  useEffect(() => {
    const handleSlideChange = () => {
      if (swiperRef.current) {
        const newIndex = swiperRef.current.activeIndex;
        setCurrentSection(newIndex);
        // Save the current slide index to localStorage
        localStorage.setItem("currentSlideIndex", newIndex.toString());
      }
    };
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", handleSlideChange);
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.off("slideChange", handleSlideChange);
      }
    };
  }, []);

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
        slidesPerView={"auto"}
        centeredSlides
        speed={transitionSpeed}
        mousewheel={true}
        modules={[Mousewheel]}
        initialSlide={currentSection} // Set initial slide index here
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Slide to saved index on load
          swiper.slideTo(currentSection);
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
