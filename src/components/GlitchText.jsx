"use client";
import { motion } from "framer-motion";

export default function GlitchText({
  children,
  as: Component = "span",
  intensity = "medium",
  delay = 0,
  duration = 2.5,
  className = "",
  style = {},
}) {
  const intensities = {
    low: "glitch-anim 4s ease infinite",
    medium: "glitch-anim 2.5s ease infinite",
    high: "glitch-anim 1.5s ease infinite",
  };

  const glitchStyle = {
    position: "relative",
    display: "inline-block",
  };

  return (
    <Component
      className={`glitch ${className}`}
      data-text={children}
      style={{
        ...glitchStyle,
        ...style,
        "--glitch-delay": `${delay}s`,
      }}
    >
      {children}
    </Component>
  );
}
