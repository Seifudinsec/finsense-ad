import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { LinkIcon, CheckIcon } from "../components/Icons";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const DARK_RED = "#DE1117";
const LIGHT_RED = "#f87171";
const BG = "#080808";

export const PaymentsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const bannerOpacity = interpolate(frame, [0, 15], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Icon */
  const iconScale = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Product label + headline */
  const headlineOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [10, 30], [44, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Subtitle */
  const subOpacity = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [26, 42], [18, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Animated counter: 0 → 99% */
  const rawCount = interpolate(frame, [38, 68], [0, 99], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const count = Math.floor(rawCount);
  const countOpacity = interpolate(frame, [38, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Tech stack tags */
  const tagsOpacity = interpolate(frame, [48, 62], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Security badge */
  const badgeOpacity = interpolate(frame, [60, 72], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(frame, [60, 72], [0.8, 1], {
    easing: Easing.bezier(0.34, 1.3, 0.64, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>

      {/* Left-aligned chevron + heading (match photo) */}
      <div style={{
        position: "absolute",
        top: 28,
        left: 48,
        display: "flex",
        alignItems: "center",
        gap: 14,
        zIndex: 20,
        opacity: bannerOpacity,
        willChange: "opacity",
        pointerEvents: "none",
      }}>
        {/* red chevron */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M7 4L17 12L7 20" stroke={RED} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{ fontSize: 34, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>
          SERVICES THAT DIGITIZE YOUR BUSINESS
        </div>
      </div>

      {/* Small right-aligned scene label (where "Proven outcomes" was) */}
      <div style={{
        position: "absolute",
        top: 32,
        right: 48,
        zIndex: 20,
        opacity: bannerOpacity,
        willChange: "opacity",
        pointerEvents: "none",
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: RED, letterSpacing: 0.5 }}>
          1 of 2
        </div>
      </div>

      {/* Top-right ambient glow */}
      <div style={{
        position: "absolute", top: -180, right: -180,
        width: 680, height: 680, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.09) 0%, transparent 65%)`,
      }} />

      {/* Left stripe accent */}
      <div style={{
        position: "absolute", left: 0, top: "15%",
        width: 5, height: "70%", borderRadius: 3,
        background: `linear-gradient(180deg, transparent, ${RED}, transparent)`,
        opacity: headlineOpacity,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingLeft: 48, paddingRight: 48, width: "100%", boxSizing: "border-box",
      }}>

        {/* Link icon */}
        <div style={{
          transform: `scale(${iconScale})`,
          width: 76, height: 76, marginBottom: 20,
          filter: `drop-shadow(0 0 18px rgba(234, 56, 76, 0.35))`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <LinkIcon size={76} color={RED} />
        </div>

        {/* Product label */}
        <div style={{
          opacity: headlineOpacity,
          fontWeight: 600, fontSize: 13, color: RED,
          letterSpacing: 5, textTransform: "uppercase", marginBottom: 12,
        }}>
          Core Capabilities
        </div>

        {/* Headline */}
        <div style={{
          transform: `translateY(${headlineY}px)`, opacity: headlineOpacity,
          fontWeight: 900, fontSize: 64, color: "white",
          letterSpacing: -2, textAlign: "center", lineHeight: 1.05, marginBottom: 20,
        }}>
          Core Banking & <br />
          <span style={{ color: RED }}>API Integration</span>
        </div>

        {/* Subtitle */}
        <div style={{
          transform: `translateY(${subY}px)`, opacity: subOpacity,
          fontSize: 20, color: "rgba(255,255,255,0.6)",
          textAlign: "center", lineHeight: 1.55, marginBottom: 32, maxWidth: 680,
        }}>
          Modernizing core financial systems and connecting digital platforms.
        </div>

        {/* Tech stack row */}
        <div style={{
          opacity: tagsOpacity,
          display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center",
          marginBottom: 36, maxWidth: 640
        }}>
          {["T24", "Flexcube", "Skaleet", "Fiorano", "WSO2"].map((tech) => (
            <span key={tech} style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: LIGHT_RED, borderRadius: 6, padding: "5px 12px",
              fontSize: 14, fontWeight: 600, letterSpacing: 0.5
            }}>{tech}</span>
          ))}
        </div>

        {/* Animated counter */}
        <div style={{ opacity: countOpacity, textAlign: "center", marginBottom: 36 }}>
          <div style={{
            fontWeight: 900, fontSize: 88, color: RED,
            letterSpacing: -3, lineHeight: 1,
            textShadow: `0 0 40px rgba(234, 56, 76, 0.35)`,
          }}>
            {count}%
          </div>
          <div style={{
            fontSize: 14, color: "rgba(255,255,255,0.5)",
            letterSpacing: 3, textTransform: "uppercase", marginTop: 8,
          }}>
            Project Success Rate
          </div>
        </div>

        {/* Validation badge */}
        <div style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          background: "rgba(234, 56, 76, 0.08)",
          border: `1px solid ${RED}`,
          borderRadius: 100, padding: "11px 28px",
          fontSize: 15, color: LIGHT_RED, fontWeight: 600, letterSpacing: 0.5,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <CheckIcon size={18} color={RED} />
            <span>Bank-grade middleware & integrations</span>
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
