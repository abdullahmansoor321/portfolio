"use client";
import { useState, useEffect, useRef } from "react";
import HireModal from "./HireModal";

/* Component for the Matrix-style background rain */
function HackerRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()_+-=[]{}|;:,.<>?/µ¶ΣΩ";
    const fontSize = 14;
    let columns = 0;
    let drops = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 5, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 245, 212, 0.35)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.25,
      }}
    />
  );
}

function CinematicAvatar({ compact = false, size = 400, dialogueTop }) {
  const canvasRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [messageIdx, setMessageIdx] = useState(0);
  const [displayMsg, setDisplayMsg] = useState("");
  const [msgTyping, setMsgTyping] = useState(true);

  const CONVERSATION_MSGS = [
    "Hey there 👋 Welcome to my digital command center.",
    "Orchestrating autonomous systems.",
    "Agentic Sovereignty.",
    "First-principles engineering.",
    "Architecting the next era.",
    "Building systems that evolve.",
    "Ready to connect? →"
  ];

  useEffect(() => {
    const current = CONVERSATION_MSGS[messageIdx];
    let t;

    if (msgTyping) {
      if (displayMsg.length < current.length) {
        t = setTimeout(() => setDisplayMsg(current.slice(0, displayMsg.length + 1)), 50);
      } else {
        t = setTimeout(() => setMsgTyping(false), 3000);
      }
    } else {
      if (displayMsg.length > 0) {
        t = setTimeout(() => setDisplayMsg(displayMsg.slice(0, -1)), 30);
      } else {
        setMsgTyping(true);
        setMessageIdx((i) => (i + 1) % CONVERSATION_MSGS.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayMsg, msgTyping, messageIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const init = () => {
      const canvasSize = compact ? Math.round(size * 1.15) : Math.round(size * 1.2);
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 20 + Math.random() * 50,
        speed: 1 + Math.random() * 3,
        opacity: Math.random() * 0.5
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -p.len) p.y = canvas.height + p.len;
        const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.len);
        grad.addColorStop(0, `rgba(0, 245, 212, ${p.opacity})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.len);
        ctx.stroke();
      });

      const scanY = (Date.now() % 3000) / 3000 * canvas.height;
      ctx.fillStyle = "rgba(0, 245, 212, 0.05)";
      ctx.fillRect(0, scanY, canvas.width, 2);
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    return () => cancelAnimationFrame(raf);
  }, [compact]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -25;
    setTilt({ x, y });
  };

  return (
    <div 
      onMouseMove={compact ? undefined : handleMouseMove}
      onMouseLeave={compact ? undefined : () => setTilt({ x: 0, y: 0 })}
      style={{ 
        position: "relative",
        width: compact ? `min(76vw, ${size}px)` : size,
        height: compact ? `min(76vw, ${size}px)` : size,
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: compact ? "none" : "1200px"
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: "absolute", inset: 0, width: "100%", height: "100%",
          borderRadius: "50%", opacity: 0.8, filter: "blur(1px)" 
        }} 
      />
      
      {/* HUD Elements */}
      {compact ? (
        /* Reduced HUD for Mobile */
        <HUDMetric label="SYS_STATUS" value="ONLINE" top="-18%" right="-16%" color="var(--cyan)" />
      ) : (
        /* Full HUD for Desktop */
        <>
          <HUDMetric label="SYNC_STABLE" value="99.8%" top="10%" left="-15%" color="var(--cyan)" />
          <HUDMetric label="CORE_TEMP" value="42°C" bottom="15%" right="-20%" color="var(--amber)" />
          <HUDMetric label="AUTH_AGENT" value="ACTIVE" top="40%" right="-22%" color="var(--purple)" />
        </>
      )}

      <div style={{
        position: "relative", zIndex: 2,
        width: "85%", height: "auto",
        transition: "transform 0.15s ease-out",
        transform: compact
          ? "translateZ(0)"
          : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(50px)`,
        transformStyle: "preserve-3d"
      }}>
        <img 
          src="/avatar.png" 
          alt="Avatar Video Stream" 
          style={{ 
            width: "100%", height: "auto", borderRadius: "30px",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
            border: "1px solid rgba(0,245,212,0.3)"
          }} 
        />
        
        {/* Dynamic Conversation Box */}
        <div style={{
          position: "absolute",
          top: compact ? "-36%" : (dialogueTop || "-38%"),
          left: "50%",
          transform: compact ? "translateX(-50%)" : "translateX(-50%) translateZ(80px)",
          animation: "float 4s ease-in-out infinite",
          minWidth: compact ? "170px" : "260px",
          maxWidth: compact ? "200px" : "300px",
          zIndex: 12,
        }}>
          <div style={{
            background: "rgba(0, 10, 20, 0.9)",
            border: "1px solid var(--cyan)",
            borderRadius: "8px",
            padding: "10px 12px",
            boxShadow: "0 0 20px rgba(0, 245, 212, 0.2)",
            backdropFilter: "blur(8px)",
            position: "relative",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              marginBottom: "4px", fontSize: "0.6rem",
              color: "var(--cyan)", fontFamily: "monospace", opacity: 0.7
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", animation: "pulse 2s infinite" }} />
              ENCRYPTED_COMMS::ACTIVE
            </div>
            <div style={{
              fontSize: compact ? "0.75rem" : "0.85rem", color: "#fff",
              fontFamily: "var(--font-mono)", lineHeight: 1.4, minHeight: "2.4em"
            }}>
              {displayMsg}
              <span style={{ display: "inline-block", width: 2, height: "1em", background: "var(--cyan)", animation: "blink 0.8s infinite" }} />
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        position: "absolute", inset: "10%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,212,0.1) 0%, transparent 75%)",
        animation: "pulse-glow 6s ease-in-out infinite"
      }} />
    </div>
  );
}

function HUDMetric({ label, value, top, left, bottom, right, color }) {
  return (
    <div style={{
      position: "absolute", top, left, bottom, right,
      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
      color, whiteSpace: "nowrap", zIndex: 1, pointerEvents: "none",
      opacity: 0.6, letterSpacing: "0.05em"
    }}>
      <div style={{ borderBottom: `1px solid ${color}`, padding: "2px 4px", background: "rgba(0,0,0,0.5)" }}>{label}</div>
      <div style={{ padding: "2px 4px", background: "rgba(0,0,0,0.3)" }}>{value}</div>
    </div>
  );
}

const ROLES = ["MERN Stack Development", "Python Development", "Full-Stack Engineering"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showHire, setShowHire] = useState(false);
  const [vw, setVw] = useState(1280);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!deleting) {
      if (text.length < current.length) t = setTimeout(() => setText(current.slice(0, text.length + 1)), 72);
      else t = setTimeout(() => setDeleting(true), 2400);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 36);
      else { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); }
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  useEffect(() => {
    const sync = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const isMobile = vw <= 768;
  const isTablet = vw > 768 && vw <= 1024;
  const isSmall = vw <= 480;
  const isLaptopViewport = vw > 1024 && vw <= 1536 && vh <= 900;
  const desktopAvatarSize = isTablet ? 360 : 400;
  const mobileAvatarSize = isSmall ? 210 : 250;
  const desktopDialogueTop = isLaptopViewport ? "-20%" : "-38%";

  return (
    <section id="home" style={{ 
      minHeight: isMobile ? "auto" : "100svh", 
      display: "flex", 
      alignItems: isMobile ? "flex-start" : "center", 
      paddingTop: isMobile ? (isSmall ? "calc(var(--nav-h) + 4.6rem)" : "calc(var(--nav-h) + 5.3rem)") : "calc(var(--nav-h) + 3rem)",
      paddingBottom: isMobile ? (isSmall ? "1.35rem" : "1.9rem") : "6rem",
      paddingLeft: isMobile ? 0 : "2rem",
      paddingRight: isMobile ? 0 : "2rem",
      position: "relative",
      background: "var(--void)"
    }}>
      {/* Hacker Matrix Rain */}
      <HackerRain />
      
      {/* Scanline Overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        backgroundSize: "100% 4px, 3px 100%", pointerEvents: "none", zIndex: 1
      }} />

      <div className="container" style={{ 
        display: "flex", 
        alignItems: "center", 
        flexDirection: isMobile ? "column" : "row", 
        gap: isMobile ? (isSmall ? "1.6rem" : "2.1rem") : (isTablet ? "2.2rem" : "4rem"), 
        paddingTop: "0",
        position: "relative",
        zIndex: 2
      }}>

        {/* Avatar: on top for mobile, on right for desktop */}
        {isMobile && (
          <div style={{ position: "relative", display: "flex", justifyContent: "center", flexShrink: 0, paddingTop: isSmall ? "2.3rem" : "2.8rem" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isSmall ? 190 : 240, height: isSmall ? 190 : 240, background: "radial-gradient(circle, rgba(0,245,212,0.2) 0%, transparent 70%)", filter: "blur(26px)", pointerEvents: "none" }} />
            <CinematicAvatar compact={true} size={mobileAvatarSize} />
          </div>
        )}

        {/* Text block */}
        <div style={{ flex: isMobile ? "0 1 auto" : "1 1 520px", zIndex: 5, minWidth: 0, width: "100%", textAlign: isMobile ? "center" : "left" }}>
          <div style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: isSmall ? "0.58rem" : "0.66rem", 
            color: "var(--cyan)", 
            letterSpacing: isSmall ? "0.14em" : "0.2em", 
            textTransform: "uppercase", 
            marginBottom: isMobile ? "0.8rem" : "1.5rem", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: isMobile ? "center" : "flex-start", 
            gap: isSmall ? "0.45rem" : "0.8rem",
            textShadow: "0 0 10px var(--cyan)"
          }}>
            <span style={{ display: "inline-block", width: isSmall ? 14 : 20, height: 1, background: "var(--cyan)" }} />
            Computer Systems Engineer
          </div>
          
          <h1 className="hacker-glitch" style={{ 
            fontSize: isMobile ? (isSmall ? "clamp(2rem, 10.5vw, 2.55rem)" : "clamp(2.35rem, 11vw, 3rem)") : "clamp(3.5rem, 9vw, 6rem)", 
            fontWeight: 800, 
            lineHeight: 0.9, 
            letterSpacing: "-0.04em", 
            marginBottom: "1rem",
            position: "relative"
          }}>
            <span style={{ display: "block", color: "var(--text)" }}>Abdullah</span>
            <span style={{ 
              display: "block", 
              background: "linear-gradient(135deg, var(--cyan), var(--purple))", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 15px rgba(0,245,212,0.3))" 
            }}>Mansoor</span>
          </h1>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: isMobile ? "center" : "flex-start", 
            gap: "0.5rem", 
            marginBottom: isMobile ? "1.15rem" : "2rem", 
            minHeight: isSmall ? "1.45rem" : "1.8rem" 
          }}>
            <span style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: isSmall ? "0.78rem" : "clamp(0.85rem, 2.5vw, 1.2rem)", 
              color: "#39FF14", 
              fontWeight: 700,
              textShadow: "0 0 8px #39FF14"
            }}># {text}</span>
            <span style={{ display: "inline-block", width: "3px", height: "1.2em", background: "#39FF14", animation: "blink 0.7s infinite", boxShadow: "0 0 10px #39FF14" }} />
          </div>

          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            fontSize: isMobile ? (isSmall ? "0.82rem" : "0.9rem") : "0.95rem", 
            lineHeight: isMobile ? 1.7 : 1.8, 
            maxWidth: isMobile ? 560 : 500, 
            margin: isMobile ? "0 auto 1.7rem" : "0 0 2.5rem",
            fontFamily: "var(--font-body)",
            paddingInline: isSmall ? "0.2rem" : 0
          }}>
            Associate Software Engineer specializing in <strong style={{color:"#fff"}}>Full-Stack Development</strong> and applied AI. I bridge the gap between complex requirements and scalable, autonomous infrastructures.
          </p>

          <div style={{ display: "flex", gap: isSmall ? "0.6rem" : "0.9rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start", width: "100%" }}>
            <button 
              onClick={() => setShowHire(true)} 
              className="btn btn-primary"
              style={{
                borderRadius: "4px",
                border: "1px solid var(--cyan)",
                boxShadow: "0 0 20px rgba(0,245,212,0.4)",
                flex: isSmall ? "1 1 100%" : "0 0 auto",
                justifyContent: "center",
                minHeight: isMobile ? 44 : "auto"
              }}
            >
              Hire Me
            </button>
            <a 
              href="#projects" 
              className="btn btn-outline"
              style={{ borderRadius: "4px", flex: isSmall ? "1 1 100%" : "0 0 auto", justifyContent: "center", minHeight: isMobile ? 44 : "auto" }}
            >
              View Projects
            </a>
            {!isMobile && (
              <a 
                href="/resume.pdf" 
                target="_blank" 
                className="btn btn-outline"
                style={{ borderRadius: "4px", borderColor: "var(--purple)", flex: "0 0 auto", justifyContent: "center" }}
              >
                Download CV
              </a>
            )}
          </div>
        </div>

        {/* Desktop avatar — right column */}
        {!isMobile && (
          <div style={{ flex: isTablet ? "0 0 380px" : "0 0 450px", position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ 
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", 
              width: isTablet ? 360 : 440, height: isTablet ? 360 : 440, 
              background: "radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%)", 
              filter: "blur(40px)", pointerEvents: "none" 
            }} />
            <CinematicAvatar compact={false} size={desktopAvatarSize} dialogueTop={desktopDialogueTop} />
          </div>
        )}
      </div>

      <style jsx>{`
        .hacker-glitch {
          animation: glitch 5s infinite;
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); text-shadow: none; }
          91% { transform: translate(-2px, 1px); text-shadow: 2px 0 red, -2px 0 blue; }
          93% { transform: translate(2px, -1px); text-shadow: -2px 0 red, 2px 0 blue; }
          95% { transform: translate(-1px, 2px); text-shadow: 1px 0 green, -1px 0 purple; }
          97% { transform: translate(1px, -2px); text-shadow: -1px 0 green, 1px 0 purple; }
        }
      `}</style>

      {showHire && <HireModal onClose={() => setShowHire(false)} />}
    </section>
  );
}
