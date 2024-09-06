"use client";
import React from "react";
import { Experiencia, Skills } from "./experiencia"; // Assuming the path is correct
import s from "./experience.module.css";

export default function Experience() {
  const experiencia = [
    {
      src: "/icons/ITESM.png",
      nombre: "On Campus Intern",
      company: "Tec de Monterrey",
      desc: "Maintaining and updating a PHP backend and drupal based websites. Refactoring, documenting and migrating internal tools to Next.js.",
      skills: "React, PHP, Scrum, Docker",
      initial: "August 2023",
      final: "",
      current: true,
      url: "https://tec.mx/es",
    },
    {
      src: "/icons/novo.png",
      nombre: "Web Developer",
      company: "NovoPC",
      desc: "Full-Stack development of an E-Commerce site using the Shopify API, Next.js, Tailwind and Vercel.",
      skills: "Next.js, Tailwind, React, Typescript",
      initial: "March 2022",
      final: "November 2022",
      current: false,
      url: "https://novopc.mx",
    },
    {
      src: "/icons/ml.png",
      nombre: "Software Developer",
      company: "Magic Lantern",
      desc: "Firmware decompilation using Ghidra via a Linux VM to update function stubs.Injection of code to obtain the firmware signature.",
      skills: "C, Linux, Qemu, ARM, Assembly ",
      initial: "January 2021",
      final: "March 2021",
      current: false,
      url: "https://www.magiclantern.fm/",
    },
  ];

  const skills = [
    { nombre: "CSS", initial: "2020" },
    { nombre: "Scrum", initial: "2023" },
    { nombre: "Docker", initial: "2022" },
    { nombre: "C++", initial: "2020" },
    { nombre: "C", initial: "2021" },
    { nombre: "Linux", initial: "2022" },
    { nombre: "React", initial: "2020" },
    { nombre: "Next.js", initial: "2020" },
  ];

  return (
    <main className={s.mainCont}>
      <Experiencia experiencia={experiencia} />
      <Skills skills={skills} />
    </main>
  );
}
