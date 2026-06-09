import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import crescentechLogo from "../assets/crescentech.png";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const BG = "#080808";

export const ReviewsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springConfig = {
    damping: 14,
    mass: 0.6,
    stiffness: 75,
  };

  /* Title anim */
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Staggered springs for cards */
  const kcbSpring = spring({ frame, fps, config: springConfig, delay: 12 });
  const ncbaSpring = spring({ frame, fps, config: springConfig, delay: 22 });
  const partnerSpring = spring({ frame, fps, config: springConfig, delay: 32 });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>

      {/* Top-left ambient red glow */}
      <div style={{
        position: "absolute", top: -140, left: -140,
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.08) 0%, transparent 68%)`,
      }} />

      {/* Bottom-right ambient red glow */}
      <div style={{
        position: "absolute", bottom: -140, right: -140,
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.08) 0%, transparent 68%)`,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 80px",
      }}>

        {/* Section label */}
        <div style={{
          opacity: titleOpacity,
          fontWeight: 600, fontSize: 13, color: RED,
          letterSpacing: 5, textTransform: "uppercase", marginBottom: 12,
        }}>
          Testimonials & Alliances
        </div>

        {/* Headline */}
        <div style={{
          transform: `translateY(${titleY}px)`, opacity: titleOpacity,
          fontWeight: 900, fontSize: 60, color: "white",
          letterSpacing: -2, textAlign: "center", lineHeight: 1.05, marginBottom: 44,
        }}>
          Trusted by <span style={{ color: RED }}>Industry Leaders</span>
        </div>

        {/* Side-by-side review cards */}
        <div style={{
          display: "flex", gap: 32, width: "100%", maxWidth: 940, marginBottom: 44,
          justifyContent: "center"
        }}>
          
          {/* Card 1: KCB Bank */}
          <div style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.025)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 20, padding: "30px 24px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            transform: `scale(${kcbSpring}) translateY(${interpolate(kcbSpring, [0, 1], [30, 0])}px)`,
            opacity: kcbSpring,
            position: "relative",
            minHeight: 320
          }}>
            <span style={{
              position: "absolute", top: 12, left: 20,
              fontSize: 72, color: "rgba(234, 56, 76, 0.15)",
              fontFamily: "serif", lineHeight: 1
            }}>“</span>
            
            <p style={{
              fontSize: 18, color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6, fontWeight: 400, margin: "20px 0 0 0",
              zIndex: 1
            }}>
              We have been very satisfied with the new age microservices middleware solution so far, and we will continue collaborating with them in the future.
            </p>

            <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "white", letterSpacing: 0.5 }}>
                KCB BANK KENYA
              </div>
              <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.4)", marginTop: 2 }}>
                Head of Digital Financial Services
              </div>
            </div>
          </div>

          {/* Card 2: NCBA Group */}
          <div style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.025)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 20, padding: "30px 24px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            transform: `scale(${ncbaSpring}) translateY(${interpolate(ncbaSpring, [0, 1], [30, 0])}px)`,
            opacity: ncbaSpring,
            position: "relative",
            minHeight: 320
          }}>
            <span style={{
              position: "absolute", top: 12, left: 20,
              fontSize: 72, color: "rgba(234, 56, 76, 0.15)",
              fontFamily: "serif", lineHeight: 1
            }}>“</span>

            <p style={{
              fontSize: 18, color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6, fontWeight: 400, margin: "20px 0 0 0",
              zIndex: 1
            }}>
              NCBA Group is satisfied with the services. FinSense Africa has the technical expertise and professional support to offer architecture review and integrations.
            </p>

            <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "white", letterSpacing: 0.5 }}>
                NCBA GROUP
              </div>
              <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.4)", marginTop: 2 }}>
                Group Director - Tech & Operations
              </div>
            </div>
          </div>

        </div>

        {/* Partner / Alliance Card (Crescentech) */}
        <div style={{
          transform: `scale(${partnerSpring}) translateY(${interpolate(partnerSpring, [0, 1], [20, 0])}px)`,
          opacity: partnerSpring,
          display: "flex", alignItems: "center", gap: 24,
          background: "rgba(255, 255, 255, 0.035)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: 20, padding: "16px 36px",
          width: "100%", maxWidth: 640, justifyContent: "center"
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Strategic Partner
          </span>
          <div style={{ height: 2, width: 24, background: "rgba(255,255,255,0.15)" }} />
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: 8, padding: "8px 16px"
          }}>
            <img
              src={crescentechLogo}
              alt="Crescentech Logo"
              style={{ height: 26, objectFit: "contain" }}
            />
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
