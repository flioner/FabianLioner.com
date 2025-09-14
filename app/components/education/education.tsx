"use client";
import React from "react";
import { Experiencia, Skills } from "./education_module";
import s from "./education.module.css";

export default function Education() {
  const experiencia = [
    {
      src: "/icons/posgrados.png",
      nombre: "Master in Engineering Management",
      company: "Tec de Monterrey",
      desc: "To develop ethically oriented leaders capable of planning and executing engineering projects  through leadership skills",
      skills: "Project management, Engineering Analysis, Risk Assessment",
      initial: "Sept 2025",
      final: "",
      current: true,
      url: "https://maestriasydiplomados.tec.mx/posgrados/maestria-en-gestion-de-la-ingenieria?locale=en",
    },
    {
      src: "/icons/AI.svg",
      nombre:
        "Advanced Artificial Intelligence for Data Science (Professional Concentration)",
      company: "Tec de Monterrey",
      desc: "Machine learning, deep learning, and data analytics to develop AI-driven solutions for complex data challenges.",
      skills: "React, PHP, Scrum, Docker",
      initial: "Aug 2024",
      final: "Dec 2024",
      current: false,
      url: "https://tec.mx/es",
    },
    {
      src: "/icons/ITESM.png",
      nombre: "B.S. in Computer Science and Technology (ITC)",
      company: "Tec de Monterrey",
      desc: "Design, implement, and manage advanced IT systems, networks, and digital solutions to meet the needs of modern organizations.",
      skills: "Web Design, Data Analysis, Systems Integration, Cloud Computing",
      initial: "Aug 2020",
      final: "Jun 2025",
      current: false,
      url: "https://tec.mx/en/computer-science-and-information-technologies/bs-in-computer-science-and-technology",
    },
  ];

  return (
    <main className={s.mainCont}>
      <div className={s.innerCont}>
        <div className={s.experienciaOuterCont}>
          <Experiencia experiencia={experiencia} />
        </div>
      </div>
    </main>
  );
}

/* 
   <Experiencia experiencia={experiencia} />
             <Skills skills={skills} />


*/
