"use client";
import { useState, useEffect } from "react";

export default function MissionControl() {
  const [time, setTime] = useState("");
  const [scroll, setScroll] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };

    const t = setInterval(() => {
      updateClock();
    }, 1000);

    const s = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScroll(Math.floor(pct));
      setVisible(window.scrollY > 200);
    };

    updateClock();
    s();

    window.addEventListener("scroll", s);
    return () => { clearInterval(t); window.removeEventListener("scroll", s); };
  }, []);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 768);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  if (!isMobile) {
    return (
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: "28px", background: "rgba(3,4,10,0.9)",
        backdropFilter: "blur(12px)", borderTop: "1px solid rgba(0,245,212,0.15)",
        zIndex: 9999, display: visible ? "flex" : "none",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem", fontFamily: "var(--font-mono)",
        fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--text-muted)",
        pointerEvents: "none"
      }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span style={{ opacity: 0.5 }}>POS</span>
            <span style={{ color: "var(--cyan)" }}>{scroll}%_MARK</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span style={{ opacity: 0.5 }}>TIME</span>
            <span style={{ color: "var(--amber)" }}>{time}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
            <span style={{ color: "var(--green)" }}>SYSTEM_STABLE</span>
          </div>
          <div style={{ width: 1, height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ color: "var(--cyan)", opacity: 0.6 }}>
            PROTOCOL::INTELLIGENT_DESIGN
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        position: "fixed",
        bottom: visible ? "1rem" : "-5rem",
        left: "50%",
        transform: `translateX(-50%)`,
        width: isExpanded ? "90%" : "140px",
        height: isExpanded ? "140px" : "28px",
        background: "rgba(3,4,10,0.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0,245,212,0.15)",
        borderRadius: isExpanded ? "16px" : "20px",
        zIndex: 9999,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: isExpanded ? "1.25rem" : "0 1.25rem",
        cursor: "pointer",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: isExpanded ? "flex-start" : "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        overflow: "hidden"
      }}
    >
      {!isExpanded ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", whiteSpace: "nowrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>
            <span style={{ color: "var(--cyan)" }}>XP.{scroll}%</span>
            <span style={{ color: "var(--text-muted)", opacity: 0.3 }}>|</span>
            <span style={{ color: "var(--amber)" }}>{time}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
          </div>
        </div>
      ) : (
        <div style={{ animation: "fadeIn 0.3s forwards" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--cyan)", letterSpacing: "0.1em" }}>_MISSION_TELEMETRY.V4</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>×</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.55rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>POSITION</div>
              <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{scroll}%</div>
            </div>
            <div>
              <div style={{ fontSize: "0.55rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>LOC_TIME</div>
              <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{time}</div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
             <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "1px" }}>
                <div style={{ width: `${scroll}%`, height: "100%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)", transition: "width 0.3s" }} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
