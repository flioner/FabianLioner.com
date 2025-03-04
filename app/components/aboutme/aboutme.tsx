"use client";
import s from "./aboutme.module.css";
import React, { useState } from "react";

const text = `
  As a front-end developer specializing in React and Next.js, I bring
  a strong blend of technical expertise and creative flair to my work.
  With experience refactoring and leading the front-end development of
  national-level tools, I excel in architecture, frameworks, and UI/UX
  design. My journey began as an intern at Tec de Monterrey, where I
  honed my skills in web development, and I'm now focusing on AI and
  machine learning. Proficient in CSS animations and passionate about
  exploring new technologies like Three.js, I strive to create
  refined, impactful solutions that push the boundaries of innovation.
  Soon to graduate in Computer Science with a focus on AI, I am
  committed to delivering excellence in every project I undertake.
`;

export default function AboutMe() {
  return (
    <main className={s.mainBody}>
      <div className={s.container}>
        <img className={s.photo} src={"/photos/pfpv2.webp"} />
        <div className={s.descr}>
          <div className={s.text}>
            <div className={s.title}>About Me</div>
            {text}
          </div>
        </div>
      </div>
    </main>
  );
}
