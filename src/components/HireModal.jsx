"use client";
import { useEffect } from "react";

export default function HireModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=abdullahmansoor221@gmail.com&su=Inquiry from Portfolio&body=Hello Abdullah,";
  const linkedinLink = "https://www.linkedin.com/in/abdullah-mansoor-52220526a";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999, 
      display: "flex", alignItems: "center", justifyContent: "center",
      paddingTop: "var(--nav-h)",
      background: "rgba(3,4,10,0.92)", backdropFilter: "blur(20px)",
      animation: "fadeIn 0.3s forwards"
    }}>
      <div style={{
        width: "90%", maxWidth: "420px", background: "var(--surface)", 
        border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0,245,212,0.1)",
        animation: "fadeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "var(--text-sub)", cursor: "pointer", fontSize: "1.2rem", transition: "color 0.2s"
        }}>✕</button>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "40px", height: "1px", background: "var(--cyan)", margin: "0 auto 1.5rem" }} />
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
            Ready to <span style={{ color: "var(--cyan)" }}>Deploy</span>?
          </h3>
          <p style={{ color: "var(--text-sub)", fontSize: "0.95rem" }}>Select your preferred transmission channel.</p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href={linkedinLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ justifyContent: "center", gap: "0.75rem", borderColor: "rgba(10, 102, 194, 0.3)", color: "#0a66c2", background: "rgba(10, 102, 194, 0.05)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn Profile
          </a>
          
          <a href={gmailLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ justifyContent: "center", gap: "0.75rem", padding: "1rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.635-1.636 1.635h-3.819V11.73L12 17.38l-6.545-5.65V21h-3.82C.732 21 0 20.268 0 19.366V5.457c0-1.215 1.34-1.917 2.304-1.178L12 11.417l9.697-7.138c.963-.74 2.303-.037 2.303 1.178z"/></svg>
            Direct Gmail
          </a>
        </div>
        
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
            ENCRYPTED_HANDSHAKE: SUCCESS
          </p>
        </div>
      </div>
    </div>
  );
}
