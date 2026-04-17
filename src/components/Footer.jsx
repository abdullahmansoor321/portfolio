"use client";
import { useState, useEffect } from "react";
export default function Footer() {
  const year = new Date().getFullYear();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInitiating, setIsInitiating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const handleInitiate = () => {
    setIsInitiating(true);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsInitiating(false), 1000);
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sync = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const dance = (i) => ({
    display: "inline-block",
    transform: `translateY(${Math.sin((scrollY / 100) + i) * (isHovered ? 25 : 15)}px) 
                translateX(${isHovered ? (Math.random() - 0.5) * 4 : 0}px)`,
    transition: "transform 0.1s ease-out, color 0.3s",
    color: isHovered ? "var(--cyan)" : (i % 2 === 0 ? "var(--cyan)" : "#fff"),
    textShadow: isHovered ? "0 0 20px var(--cyan)" : "none",
    cursor: "default"
  });

  return (
    <footer 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: isMobile ? "6rem 1rem 3rem" : isTablet ? "8rem 1.25rem 4rem" : "12rem 2rem 5rem",
        background: "#02040a",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,245,212,0.15)"
      }}
    >
      {/* Route Initiate Overlay: High-Tech HUD */}
      {isInitiating && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(2,4,10,0.95)", backdropFilter: "blur(20px)",
          zIndex: 99999, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", overflow: "hidden",
          animation: "glitchIn 0.2s ease-out"
        }}>
          {/* Scanning Lines */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "repeating-linear-gradient(0deg, rgba(0,245,212,0.03) 0px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 3px", pointerEvents: "none", animation: "scanline 10s linear infinite"
          }} />

          {/* HUD Brackets */}
          <div style={{ position: "absolute", top: "10%", left: "10%", width: 40, height: 40, borderTop: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" }} />
          <div style={{ position: "absolute", top: "10%", right: "10%", width: 40, height: 40, borderTop: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 40, height: 40, borderBottom: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 40, height: 40, borderBottom: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" }} />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", position: "relative" }}>
            <div style={{ 
              color: "var(--cyan)", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.6em", 
              animation: "pulse 0.8s infinite", textAlign: "center" 
            }}>
              [ INITIATING_ROUTE ]
            </div>
            
            <div style={{ width: isMobile ? "220px" : "280px", height: "4px", background: "rgba(255,255,255,0.05)", position: "relative" }}>
              <div style={{ 
                width: "100%", height: "100%", background: "var(--cyan)", 
                boxShadow: "0 0 15px var(--cyan)",
                animation: "shimmer 1.2s infinite ease-in-out" 
              }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? "0.55rem" : "1rem", color: "var(--text-muted)", fontSize: isMobile ? "0.56rem" : "0.65rem", maxWidth: "400px", textAlign: "center" }}>
              <span>ENCRYPTING...</span>
              <span>TUNNEL_ESTABLISHED</span>
              <span>NODE_V4_ACTIVE</span>
              <span style={{ color: "var(--purple)" }}>HANDSHAKE_COMPLETE</span>
            </div>
          </div>

          {/* Random Bits Effect */}
          <div style={{ position: "absolute", bottom: "5%", width: "100%", textAlign: "center", color: "rgba(255,255,255,0.1)", fontSize: "0.5rem", letterSpacing: "1em" }}>
            0A 4F 9E 12 BC 7D 52 33 1A 90 F2 C1
          </div>
        </div>
      )}

      {/* Dynamic Cursor Spotlight */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,245,212,0.06), transparent 80%)`,
        pointerEvents: "none",
        zIndex: 1
      }} />
      {/* 3D Perspective Grid */}
      <div style={{
        position: "absolute", top: 0, left: "-50%", right: "-50%", bottom: 0,
        background: `linear-gradient(rgba(0,245,212,0.05) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(0,245,212,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        transform: "perspective(500px) rotateX(60deg) translateY(-100px)",
        transformOrigin: "top",
        opacity: 0.3,
        pointerEvents: "none",
        maskImage: "linear-gradient(to bottom, transparent, black, transparent)"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Cinematic Headline with Dancing Words */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "3.5rem" : isTablet ? "6rem" : "10rem" }}>
          <div style={{ 
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", 
            letterSpacing: isMobile ? "0.28em" : "0.5em", marginBottom: isMobile ? "1.1rem" : "2.5rem", opacity: 0.8 
          }}>_TRANSMISSION_PROTOCOL</div>
          
          <h2 style={{ 
            fontSize: "clamp(3rem, 8vw, 6rem)", 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: "-0.04em",
            color: "#fff",
            marginBottom: "3.5rem"
          }}>
            SYSTEMS ARE NOT BUILT, <br/>
            {"THEY ARE ".split("").map((char, i) => (
              <span key={i} style={dance(i)}>{char === " " ? "\u00A0" : char}</span>
            ))}
            <br/>
            {"ORCHESTRATED".split("").map((char, i) => (
              <span key={i} style={dance(i + 10)}>{char}</span>
            ))}
          </h2>

          <button 
            onClick={handleInitiate}
            className="btn btn-primary" 
            style={{ 
              padding: isMobile ? "1rem 1.35rem" : "1.5rem 4rem", fontSize: isMobile ? "0.9rem" : "1.1rem", 
              boxShadow: "0 0 40px rgba(0,245,212,0.25)",
              border: "1px solid rgba(0,245,212,0.5)"
            }}
          >
            Initiate Contact
          </button>
        </div>

        {/* High-Stature Info Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: isMobile ? "2rem" : "5rem",
          paddingBottom: isMobile ? "2rem" : "5rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div>
            <h4 style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--cyan)", letterSpacing: "0.2em", marginBottom: "2rem" }}>_LOCATION</h4>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,245,212,0.05)", border: "1px solid rgba(0,245,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                📍
              </div>
              <p style={{ color: "var(--text-sub)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                Karachi, Pakistan <br/>
                <span style={{ color: "var(--cyan)", fontSize: "0.8rem" }}>TERMINAL: UTC+5</span>
              </p>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--purple)", letterSpacing: "0.2em", marginBottom: "2rem" }}>_CONNECTIVITY</h4>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
              <a href="https://github.com/abdullahmansoor321" target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e)=>e.currentTarget.style.color="#fff"}>GITHUB</a>
              <a href="https://www.linkedin.com/in/abdullah-mansoor-52220526a" target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e)=>e.currentTarget.style.color="#fff"}>LINKEDIN</a>
              <a href="mailto:abdullahmansoor321@gmail.com" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none" }}>EMAIL</a>
              <a href="/resume.pdf" target="_blank" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none" }}>RESUME</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--amber)", letterSpacing: "0.2em", marginBottom: "2rem" }}>_STATUS</h4>
            <p style={{ color: "var(--text-sub)", fontSize: "0.9rem", lineHeight: 1.8 }}>
              Open for technical partnerships and high-scale architectural challenges.
            </p>
          </div>
        </div>

        {/* Final Status Bar */}
        <div style={{ 
          paddingTop: isMobile ? "1.4rem" : "3rem", 
          display: "flex", 
          justifyContent: isMobile ? "center" : "space-between", 
          alignItems: "center", 
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap", 
          gap: isMobile ? "0.9rem" : "2rem" 
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>BUILT BY <span style={{ color: "var(--cyan)" }}>ABDULLAH_MANSOOR</span></span>
          </div>
          <div style={{ display: "flex", gap: isMobile ? "1rem" : "2.5rem", flexWrap: "wrap", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: isMobile ? "0.54rem" : "0.6rem", color: "var(--text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 10px var(--green)" }} />
              UPTIME: 99.9%
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
              PROTOCOL: SECURE
            </span>
          </div>
        </div>
      </div>
    </footer>

  );
}
