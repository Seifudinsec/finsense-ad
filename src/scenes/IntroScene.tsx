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

  /* ── Tagline reveal ── */
  const taglineOpacity = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [85, 105], [20, 0], {
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

        {/* Brand logo (Icon + Seamless Text reveal) */}
        <div style={{ marginBottom: 40 }}>
          <FinSenseLogo size={140} color={RED} animate={true} />
        </div>

        {/* Tagline reveals after logo is fully shown */}
        <div style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 400, fontSize: 20,
          color: "rgba(255,255,255,0.60)",
          letterSpacing: 4, textTransform: "uppercase", textAlign: "center",
        }}>
          Simplifying Complex Transformations
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
