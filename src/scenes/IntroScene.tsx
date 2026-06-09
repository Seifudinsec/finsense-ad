import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { FinSenseLogo } from "../components/Logo";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const DARK_RED = "#DE1117";
const LIGHT_RED = "#f87171";
const BG = "#080808";

// Deterministic scatter for background particles
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  x:     ((i * 137.508) % 100),
  y:     ((i * 73.314)  % 100),
  size:  2 + (i % 4) * 2,
  delay: Math.floor(i * 1.8),
  color: [RED, LIGHT_RED, "#ffffff"][i % 3],
}));

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  /* ── "FinSense" headline ── */
  const nameOpacity = interpolate(frame, [28, 46], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const nameY = interpolate(frame, [28, 46], [36, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* ── "Africa" sub-word ── */
  const africaOpacity = interpolate(frame, [38, 56], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* ── Amaranth divider line sweep ── */
  const lineWidth = interpolate(frame, [54, 70], [0, 320], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* ── Tagline ── */
  const taglineOpacity = interpolate(frame, [66, 82], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [66, 82], [16, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>

      {/* Ambient radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 70% 60% at 50% 45%, rgba(234, 56, 76, 0.12) 0%, transparent 70%)`,
      }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => {
        const pOpacity = interpolate(frame, [p.delay, p.delay + 18], [0, 0.38], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: pOpacity,
          }} />
        );
      })}

      {/* Centre stack */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>

        {/* Brand logo mark */}
        <div style={{ marginBottom: 30 }}>
          <FinSenseLogo size={128} color={RED} animate={true} />
        </div>

        {/* FinSense wordmark */}
        <div style={{
          transform: `translateY(${nameY}px)`, opacity: nameOpacity,
          fontWeight: 900, fontSize: 84, color: "white",
          letterSpacing: -3, lineHeight: 1, textAlign: "center",
        }}>
          FinSense
        </div>

        {/* Africa */}
        <div style={{
          opacity: africaOpacity,
          fontWeight: 300, fontSize: 30, color: RED,
          letterSpacing: 14, textTransform: "uppercase",
          marginTop: 8, marginBottom: 32, textAlign: "center",
          textShadow: `0 0 10px rgba(234, 56, 76, 0.3)`,
        }}>
          Africa
        </div>

        {/* Red line */}
        <div style={{
          width: lineWidth, height: 2,
          background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
          borderRadius: 1, marginBottom: 26,
        }} />

        {/* Tagline */}
        <div style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 400, fontSize: 18,
          color: "rgba(255,255,255,0.60)",
          letterSpacing: 4, textTransform: "uppercase", textAlign: "center",
        }}>
          Simplifying Complex Transformations
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
