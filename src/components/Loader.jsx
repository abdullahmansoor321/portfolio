"use client";
import { useState, useEffect } from "react";

export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [phase, setPhase] = useState("initializing");

  const LOG_MESSAGES = [
    "Initializing neural core...",
    "Linking hyperspace relay...",
    "Calibrating visual sensors...",
    "Fetching project repositories...",
    "Syncing temporal data...",
    "Bypassing mainframe firewall...",
    "Engaging cinematic engines...",
    "System ready."
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < LOG_MESSAGES.length) {
        setLogs(prev => [...prev.slice(-4), LOG_MESSAGES[currentLog]]);
        currentLog++;
      }
    }, 450);

    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progInterval);
          setTimeout(() => setPhase("complete"), 400);
          setTimeout(onFinished, 1200);
          return 100;
        }
        return p + Math.random() * 8;
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progInterval);
    };
  }, [onFinished]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "var(--void)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
      opacity: phase === "complete" ? 0 : 1,
      transform: phase === "complete" ? "scale(1.1)" : "scale(1)",
      pointerEvents: phase === "complete" ? "none" : "all",
      fontFamily: "var(--font-mono)",
    }}>
      {/* HUD Elements */}
      <div style={{
        width: 300,
        position: "relative",
      }}>
        {/* Progress percent */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          fontSize: "0.7rem",
          color: "var(--cyan)",
          letterSpacing: "0.1em",
        }}>
          <span>SYSTEM_INIT</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        {/* Bar */}
        <div style={{
          height: 4,
          background: "rgba(0,245,212,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--cyan)",
            boxShadow: "0 0 15px var(--cyan)",
            transition: "width 0.2s ease-out",
          }} />
        </div>

        {/* Logs */}
        <div style={{
          marginTop: "1.5rem",
          minHeight: "80px",
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              fontSize: "0.62rem",
              color: i === logs.length - 1 ? "var(--cyan)" : "var(--text-muted)",
              marginBottom: "0.2rem",
              opacity: i === logs.length - 1 ? 1 : 0.4 + (i * 0.1),
              animation: "fadeIn 0.3s forwards",
            }}>
              <span style={{ marginRight: "0.5rem" }}>[OK]</span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Background visual - scanline */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(transparent 50%, rgba(0,245,212,0.02) 50%)",
        backgroundSize: "100% 4px",
        pointerEvents: "none",
      }} />
    </div>
  );
}
