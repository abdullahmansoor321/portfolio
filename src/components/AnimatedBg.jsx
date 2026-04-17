"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    let mouseX = 0, mouseY = 0;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (!isCoarse) {
      document.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Nebula clouds
    const nebulas = [
      { x: W * 0.2, y: H * 0.3, r: 400, color: "rgba(0, 245, 212, 0.04)", vx: 0.2, vy: 0.1 },
      { x: W * 0.8, y: H * 0.7, r: 500, color: "rgba(139, 92, 246, 0.05)", vx: -0.15, vy: -0.2 },
      { x: W * 0.5, y: H * 0.5, r: 600, color: "rgba(245, 158, 11, 0.03)", vx: 0.1, vy: -0.1 },
    ];

    // Particles
    const particleCount = isCoarse ? 56 : 110;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.8 ? "0,245,212" : Math.random() > 0.6 ? "139,92,246" : "255,255,255",
    }));

    // Shooting stars
    const shooters = Array.from({ length: 4 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, active: false,
    }));
    const spawnShooter = (s) => {
      s.x = Math.random() * W;
      s.y = Math.random() * H * 0.4;
      s.vx = -4 - Math.random() * 6;
      s.vy = 2 + Math.random() * 4;
      s.maxLife = 50 + Math.random() * 50;
      s.life = 0;
      s.active = true;
    };
    let shooterTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 1. Draw Nebulas (Fuzzy Background Clouds)
      nebulas.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -n.r) n.x = W + n.r;
        if (n.x > W + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = H + n.r;
        if (n.y > H + n.r) n.y = -n.r;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // 2. Shooting stars
      shooterTimer++;
      if (!isCoarse && shooterTimer % 180 === 0) {
        const idle = shooters.find((s) => !s.active);
        if (idle) spawnShooter(idle);
      }
      shooters.forEach((s) => {
        if (!s.active) return;
        s.x += s.vx; s.y += s.vy; s.life++;
        const prog = s.life / s.maxLife;
        const alpha = Math.sin(prog * Math.PI);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 15, s.y - s.vy * 15);
        const sg = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 15, s.y - s.vy * 15);
        sg.addColorStop(0, `rgba(255,255,255,${alpha})`);
        sg.addColorStop(1, "transparent");
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (s.life >= s.maxLife) s.active = false;
      });

      // 3. Particles & Connections
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();

        // Mouse interaction (repulsion/attraction)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (!isCoarse && dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0,245,212,${(1 - dist / 150) * 0.15})`;
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "var(--void)",
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
