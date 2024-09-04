"use client";
import s from "./projects.module.css";
import React, { useState, useEffect, useRef } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  return (
    <main>
      <Swiper slidesPerView={"auto"} centeredSlides loop>
        {projects.map((project, index) => (
          <SwiperSlide className={s.slide} key={index}>
            <div className={`${s.projectCont} ${s.mobile}`}>
              <div className={s.project}>
                <h2 className={s.title}>{project.name}</h2>
                <p className={s.desc}>{project.description}</p>
                <div id="parent" className={s.technologies}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
