import { useState, useEffect } from "react";
import styles from "./mouse.module.css";

const Mouse = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Optional: Animate leaving smoothly (basic linear motion)
  useEffect(() => {
    const interval = setInterval(() => {
      setMousePos((pos) => ({
        x: pos.x + velocity.x,
        y: pos.y + velocity.y,
      }));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [velocity]);

  return (
    <div className={styles.container}>
      <div className={styles.texture} />
      <div
        className={styles.cursor}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />
    </div>
  );
};

export default Mouse;
