"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOver = (e) => { if (e.target.closest("a,button,[data-hover],.card,.chip,.project-card")) setHovering(true); };
    const onOut = (e) => { if (e.target.closest("a,button,[data-hover],.card,.chip,.project-card")) setHovering(false); };

    const animate = () => {
      trail.current.x += (pos.x - trail.current.x) * 0.13;
      trail.current.y += (pos.y - trail.current.y) * 0.13;
      setTrailPos({ x: trail.current.x, y: trail.current.y });
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, [pos.x, pos.y]);

  const ringSize = hovering ? 56 : 38;
  const off = ringSize / 2;

  return (
    <>
      {/* Ring */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: ringSize, height: ringSize,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "rgba(0,245,212,0.8)" : "rgba(0,245,212,0.35)"}`,
          background: hovering ? "rgba(0,245,212,0.06)" : "transparent",
          transform: `translate(${trailPos.x - off}px,${trailPos.y - off}px) scale(${clicking ? 0.75 : 1})`,
          transition: "width 0.3s,height 0.3s,border-color 0.3s,background 0.3s,transform 0.1s",
          pointerEvents: "none",
          zIndex: 1000000,
          mixBlendMode: "screen",
        }}
      />
      {/* Dot */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "var(--cyan)",
          transform: `translate(${pos.x - 4}px,${pos.y - 4}px)`,
          transition: "transform 0.04s linear",
          pointerEvents: "none",
          zIndex: 1000001,
          boxShadow: "0 0 12px rgba(0,245,212,0.8)",
        }}
      />
    </>
  );
}
