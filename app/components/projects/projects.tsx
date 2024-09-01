"use client";
import s from "./projects.module.css";
import React, { useState, useEffect, useRef } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Projects() {
  const projects = [
    {
      name: "Menu App Startup",
      description: "Digital Menu app for local restaurants and bars",
      technologies: ["Next.js", "Vercel", "Cloudflare", "Start-up"],
      company: "MenuApp",
      link: "https://menu.fabianlioner.com",
    },
    {
      name: "Oracle Java Bot",
      description:
        "Fully Cloud Native Agile task management app, containerized using Docker and Kubernetes",
      technologies: ["Next.js", "Typescript", "Springboot", "OracleCloud"],
      company: "Oracle",
      link: "https://menu.fabianlioner.com",
    },
    {
      name: "BAMX Cold Chain App",
      description:
        " Multi platfofrm (IOS, Android and Web) app for Mexico’s Food Bank",
      technologies: ["Next.js", "Capacitor", "Lottie", "Cypress"],
      company: "BAMX",
      link: "https://menu.fabianlioner.com",
    },
  ];

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    // Clean up event listeners on component unmount
    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <main>
      <div id="slider" className={s.slider} ref={sliderRef}>
        {projects.map((project, index) => (
          <div key={index} className={`${s.projectCont} ${s.mobile}`}>
            <div className={s.project}>
              <h2 className={s.title}>{project.name}</h2>
              <p className={s.desc}>{project.description}</p>
              <div className={s.technologies}>
                {project.technologies.map((tech) => (
                  <div key={index} className={s.tech}>
                    {tech}
                  </div>
                ))}
              </div>
              <div className={s.urlCont}>
                <a className={s.url} href={project.link}>
                  View project
                </a>
              </div>
            </div>

            <div className={s.imgCont}>
              <img
                draggable="false"
                className={s.img}
                src={"/photos/projects/" + project.company + ".png"}
                alt={project.company + " logo"}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
