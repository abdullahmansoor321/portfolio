"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 9997, background: "rgba(0,245,212,0.08)" }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: "linear-gradient(90deg, var(--cyan), var(--purple), var(--amber))",
        boxShadow: "0 0 10px rgba(0,245,212,0.6)",
        transition: "width 0.08s linear",
      }} />
    </div>
  );
}
