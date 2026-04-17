"use client";
import { useEffect, useState } from "react";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 768);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="contact" style={{
      background: "var(--deep)",
      padding: isMobile ? "4rem 0 5rem" : "8rem 0",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "-30%", left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? 460 : 800, height: isMobile ? 360 : 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,212,0.07) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", maxWidth: isMobile ? "100%" : "700px" }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--cyan)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
        }}>
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--cyan)" }} />
          07 — Get In Touch
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--cyan)" }} />
        </p>

        {/* Availability badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "9999px", padding: "0.4rem 1.1rem",
            fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--green)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.5s infinite" }} />
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Big heading */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: isMobile ? "clamp(2rem, 9vw, 2.8rem)" : "clamp(2.5rem, 7vw, 5rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: isMobile ? "1rem" : "1.5rem",
          letterSpacing: "-0.03em",
        }}>
          Let&apos;s build something{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>great</span>
        </h2>

        {!isMobile && (
          <p style={{
            color: "var(--text-sub)",
            maxWidth: 480,
            margin: "0 auto 2.5rem",
            fontSize: "1rem",
            lineHeight: 1.85,
          }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
            I respond within 24 hours.
          </p>
        )}

        {/* Action cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "0.75rem",
          marginBottom: isMobile ? "2rem" : "3rem",
          marginTop: isMobile ? "1rem" : "0",
        }}>
          {[
            {
              label: "Send Email",
              sub: "abdullahmansoor221@gmail.com",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdullahmansoor221@gmail.com&su=Inquiry from Portfolio&body=Hello Abdullah,",
              color: "var(--cyan)",
              icon: "✉"
            },
            {
              label: "LinkedIn",
              sub: "Connect Professionally",
              href: "https://www.linkedin.com/in/abdullah-mansoor-52220526a",
              color: "#0A66C2",
              icon: "in"
            },
            {
              label: "GitHub",
              sub: "View Source Code",
              href: "https://github.com/abdullahmansoor321",
              color: "var(--purple)",
              icon: "gh"
            },
          ].map(({ label, sub, href, color, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "row" : "column",
                gap: "0.75rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: isMobile ? "1rem 1.25rem" : "1.5rem 1rem",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                textAlign: isMobile ? "left" : "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3), 0 0 20px ${color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "10px", flexShrink: 0,
                background: `${color}18`, border: `1px solid ${color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", color, fontFamily: "var(--font-mono)", fontWeight: 700
              }}>
                {label === "GitHub" ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 1.5C6.2 1.5 1.5 6.3 1.5 12.1c0 4.6 3 8.5 7.1 9.9.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.1-4.8-5.1 0-1.1.4-2 .9-2.8-.1-.2-.4-1.3.1-2.7 0 0 .8-.2 2.8 1 .8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.2 2.8-1 2.8-1 .6 1.4.2 2.5.1 2.7.6.8.9 1.7.9 2.8 0 4-2.5 4.8-4.8 5.1.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4.1-1.4 7.1-5.3 7.1-9.9C22.5 6.3 17.8 1.5 12 1.5z" />
                  </svg>
                ) : (
                  icon
                )}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{label}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Phone link */}
        <a
          href="tel:+923090669721"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--cyan)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +92 309 0669721
        </a>
      </div>
    </section>
  );
}
