import React, { useEffect, useRef } from "react";
import s from "./experience.module.css";

interface ExperienciaItem {
  src: string;
  nombre: string;
  company: string;
  desc: string;
  skills: string;
  initial: string;
  final?: string;
  current: boolean;
  url: string;
}

interface SkillsItem {
  nombre: string;
  initial: string; // Use initial date instead of años
}

interface ExperienciaProps {
  experiencia: ExperienciaItem[];
}

interface SkillsProps {
  skills: SkillsItem[];
}

const Experiencia: React.FC<ExperienciaProps> = ({ experiencia }) => {
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    experienceRefs.current.forEach((experience, index) => {
      if (experience) {
        experience.style.animationDuration = `${
          (experiencia.length - index) * 0.4
        }s`;
        experience.style.animationDelay = `${index * 0.4}s`;
      }
    });
  }, [experiencia]);

  return (
    <>
      {experiencia.map(
        (
          { src, nombre, company, desc, skills, initial, final, current, url },
          index
        ) => (
          <div
            className={index === 0 ? s.eCont : s.eContS}
            key={index}
            ref={(el) => {
              experienceRefs.current[index] = el;
            }}
          >
            <img src={src} className={s.eImgS} alt={`${nombre} image`} />
            <div className={s.eTxtContS}>
              <div className={s.eTitleS}>{nombre}</div>
              <a
                href={url}
                className={s.eCompanyS}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company}
              </a>
              <div className={s.eDateS}>
                {initial + " - " + (current ? "Current" : final)}
              </div>
              <div className={s.eDescS}>{desc}</div>
              <div className={s.eSkillsS}>{skills}</div>
            </div>
          </div>
        )
      )}
    </>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const skillRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    skillRef.current.forEach((skill, index) => {
      if (skill) {
        skill.style.animationDuration = `${(skills.length - index) * 0.2}s`;
        skill.style.animationDelay = `${index * 0.2}s`;
      }
    });
  }, [skills]);

  // Helper function to calculate the difference in years from the initial date to now
  const calculateYears = (initial: string) => {
    const startDate = new Date(initial);
    const currentDate = new Date();
    const years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    return months < 0 ? years - 1 : years;
  };

  return (
    <div className={s.skillCont}>
      {skills.map(({ nombre, initial }, index) => (
        <div
          className={s.skill}
          key={index}
          ref={(el) => {
            skillRef.current[index] = el;
          }}
        >
          <div className={s.skillTxt}>{nombre}</div>
          <div className={s.skillY}>{"(" + calculateYears(initial) + "y)"}</div>
        </div>
      ))}
    </div>
  );
};

export { Experiencia, Skills };
