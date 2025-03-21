"use client";
import s from "./projects.module.css";
import React, { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
      name: "Tec de Monterrey Scolarships",
      description: "Nationwide used tool for awarding scholarships.",
      technologies: ["Prisma", "Typescript", "Scrum", "Jira"],
      company: "becas",
      link: "https://www.linkedin.com/in/fabianlioner/details/projects/",
    },
    {
      name: "Oracle Java Bot",
      description: "Fully Cloud Native Agile task management app",
      technologies: ["Next.js", "Typescript", "Springboot", "OracleCloud"],
      company: "Oracle",
      link: "https://youtu.be/3tbhMIe6msg?si=A4Ro4MlplAYvRSKu",
    },
    {
      name: "Myotube Identification AI Model",
      description:
        " Machine learning model for the identification of myotubes in lab samples",
      technologies: ["Vite", "LabelStudio", "AI", "FastAPI"],
      company: "Myotubes",
      link: "https://github.com/flioner/TC3007C/blob/main/MyotubeSegregationProject.pdf",
    },
    {
      name: "BAMX Cold Chain App",
      description:
        " Multi platfofrm (IOS, Android and Web) app for Mexico’s Food Bank",
      technologies: ["Next.js", "Capacitor", "Lottie", "Cypress"],
      company: "BAMX",
      link: "https://youtu.be/KDZEw_ubQG8?si=fTLrc5ASnBOJOymN",
    },
  ];

  return (
    <main className={s.mainCont}>
      <Swiper
        className={s.slider}
        direction={"horizontal"}
        mousewheel={{ forceToAxis: true }} // Enable smooth scrolling
        slidesPerView={"auto"}
        centeredSlides
        pagination={{ clickable: true }}
        loop
        initialSlide={2}
        autoHeight={false}
        modules={[Mousewheel, Pagination]}
      >
        {projects.map((project, index) => (
          <SwiperSlide className={s.slide} key={index}>
            <div className={`${s.projectCont} ${s.mobile}`}>
              <div className={s.project}>
                <div className={s.projectInner}>
                  <h2 className={s.title}>{project.name}</h2>
                  <p className={s.desc}>{project.description}</p>
                  <div id="parent" className={s.technologies}>
                    {project.technologies.map((tech) => (
                      <div key={tech} className={s.tech}>
                        {tech}
                      </div>
                    ))}
                  </div>
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
                  src={"/photos/projects/" + project.company + ".webp"}
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
