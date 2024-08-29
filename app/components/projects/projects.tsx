"use client";
import s from "./projects.module.css";
import React, { useState } from "react";

export default function Projects() {
  const projects = [
    {
      name: "BAMX Cold Chain App",
      description:
        " Multi platfofrm (IOS, Android and Web) app for Mexico’s Food Bank",
      technologies: [
        "Next.js",
        "TypeScript",
        "Firebase",
        "Capacitor",
        "Lottie",
      ],
      company: "BAMX",
      link: "",
    },
    {
      name: "Kueski Dashboard",
      description: "ARCO Privacy rights management platform for Kueski",
      technologies: ["Next.js", "Node.js", "SQL", "Vercel"],
      company: "Kueski",
      link: "",
    },
    {
      name: "Oracle Java Bot",
      description:
        "Fully Cloud Native Agile task management app for Oracle developers",
      technologies: [
        "Next.js",
        "Springboot",
        "Oracle Cloud",
        "Docker",
        "Kubernetes",
      ],
      company: "Oracle",
      link: "",
    },
    {
      name: "Menu App Startup",
      description: "Digital Menu app for local restaurants and bars",
      technologies: ["Next.js", "Vercel", "Cloudflare", "Team Management"],
      company: "MenuApp",
      link: "",
    },
  ];
  return (
    <main>
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
            <a href={project.link}>View project</a>
          </div>

          <div className={s.imgCont}>
            <img
              className={s.img}
              src={"/photos/projects/" + project.company + ".png"}
              alt={project.company + " logo"}
            />
          </div>
        </div>
      ))}
    </main>
  );
}
