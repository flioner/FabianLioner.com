"use client";
import React from "react";
import { Experiencia, Skills } from "./experiencia"; // Assuming the path is correct
import s from "./experience.module.css";

export default function Experience() {
  const experiencia = [
    {
      src: "/icons/oracle.png",
      nombre: "System Administrator",
      company: "Oracle",
      desc: "Administration, troubleshooting and deployment of the latest AI servers and technologies.",
      skills: "Linux, GPU, AI",
      initial: "Jun 2025",
      final: "",
      current: true,
      url: "https://www.oracle.com/cloud/",
    },
    {
      src: "/icons/ITESM.png",
      nombre: "On Campus Intern",
      company: "Tec de Monterrey",
      desc: "Maintaining, refactoring, documenting and migrating internal tools to newer technologies.",
      skills: "React, PHP, Scrum, Docker",
      initial: "Aug 2023",
      final: "Jun 2025",
      current: false,
      url: "https://tec.mx/es",
    },
    {
      src: "/icons/ml.png",
      nombre: "Software Developer",
      company: "Magic Lantern",
      desc: "Firmware decompilation using Ghidra via a Linux VM to update function stubs. Code injection.",
      skills: "C, Linux, Qemu, ARM, Assembly ",
      initial: "Jan 2021",
      final: "Mar 2021",
      current: false,
      url: "https://www.magiclantern.fm/",
    },
  ];

  const skills = [
    { nombre: "Linux", initial: "2022" },
    { nombre: "Docker", initial: "2022" },
    { nombre: "Nvidia", initial: "2023" },
    { nombre: "CSS", initial: "2020" },
    { nombre: "Scrum", initial: "2023" },
    { nombre: "React", initial: "2020" },
    { nombre: "Next.js", initial: "2020" },
  ];

  return (
    <main className={s.mainCont}>
      <div className={s.innerCont}>
        <div className={s.experienciaOuterCont}>
          <Experiencia experiencia={experiencia} />
        </div>
        <div className={s.skillsOuterCont}>
          <Skills skills={skills} />
        </div>
      </div>
    </main>
  );
}

/* 
   <Experiencia experiencia={experiencia} />
             <Skills skills={skills} />


*/
