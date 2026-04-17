"use client";
import { useEffect, useRef } from "react";

const EDU = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Information & Systems Engineering",
    institution: "NED University of Engineering & Technology",
    period: "2021 – 2025",
    location: "Karachi, Pakistan",
    icon: "🎓",
    primary: true,
    color: "var(--cyan)",
  },
  {
    degree: "Intermediate — Pre-Engineering",
    field: "Pre-Engineering Sciences",
    institution: "Govt. Dehli College",
    period: "2019 – 2021",
    location: "Karachi, Pakistan",
    icon: "📚",
    primary: false,
    color: "var(--purple)",
  },
];

const CERTS = [
  { name: "Meta Front-End Developer",         issuer: "Meta",       platform: "Coursera",   color: "var(--cyan)",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" },
  { name: "Google IT Automation with Python", issuer: "Google",     platform: "Coursera",   color: "var(--amber)",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Python Programming Assessment",    issuer: "HackerRank", platform: "HackerRank", color: "var(--green)",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

export default function Education() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => setTimeout(() => el.classList.add("in-view"), i * 100));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} style={{ background: "var(--void)", padding: "5rem 0 6rem" }}>
      <div className="container">
        <p className="section-eyebrow reveal">06 — Education</p>
        <h2 className="section-title reveal">
          Academic <em>Background</em>
        </h2>

        {/* Edu cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "4.5rem" }}>
          {EDU.map((edu, i) => (
            <div
              key={edu.institution}
              className={`card reveal delay-${i + 1}`}
              style={{ padding: "clamp(1.1rem, 3.5vw, 2.25rem)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = `${edu.color === "var(--cyan)" ? "rgba(0,245,212,0.5)" : "rgba(139,92,246,0.5)"}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              {edu.primary && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${edu.color}, transparent)` }} />
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: "12px",
                  background: edu.primary ? "var(--cyan-dim)" : "var(--purple-dim)",
                  border: `1px solid ${edu.primary ? "rgba(0,245,212,0.25)" : "rgba(139,92,246,0.25)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}>
                  {edu.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
                    {edu.period} · {edu.location}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.24rem 0.58rem",
                    borderRadius: "3px",
                    border: edu.primary ? "1px solid rgba(0,245,212,0.55)" : "1px solid rgba(139,92,246,0.55)",
                    background: edu.primary ? "rgba(0,245,212,0.18)" : "rgba(139,92,246,0.18)",
                    color: edu.color,
                    letterSpacing: "0.08em",
                  }}>
                    {edu.primary ? "Primary" : "Secondary"}
                  </span>
                </div>
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{edu.degree}</h3>
              <p style={{ color: edu.color, fontSize: "0.88rem", fontWeight: 500, marginBottom: "0.3rem", opacity: 0.9 }}>{edu.field}</p>
              <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.04em" }}>{edu.institution}</p>
            </div>
          ))}
        </div>

        {/* Certs divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--border))" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 700, color: "var(--text-sub)", letterSpacing: "0.25em" }}>CERTIFICATIONS</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border), transparent)" }} />
        </div>

        {/* Cert cards — horizontal scroll on mobile */}
        <div style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          marginLeft: "-1.25rem",
          marginRight: "-1.25rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          paddingBottom: "0.5rem",
        }}>
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className={`card reveal delay-${i + 1}`}
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexShrink: 0,
                width: "min(85vw, 340px)",
                scrollSnapAlign: "start",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >
              <div style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: 2,
                background: cert.color,
                opacity: 0.7,
                borderRadius: "var(--r) 0 0 var(--r)",
              }} />
              <div style={{
                width: 38, height: 38,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, padding: "6px",
              }}>
                <img
                  src={cert.icon}
                  alt={cert.issuer}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.innerHTML += `<span style="font-family:monospace;font-size:0.6rem;color:${cert.color};font-weight:700">${cert.issuer.slice(0,2).toUpperCase()}</span>`;
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.2rem" }}>{cert.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-sub)", letterSpacing: "0.05em" }}>
                  {cert.issuer} · {cert.platform}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
