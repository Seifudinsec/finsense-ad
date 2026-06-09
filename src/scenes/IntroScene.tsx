import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedLogo } from "../components/AnimatedLogo";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const BG  = "#080808";

// Deterministic scatter — no Math.random()
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x:     ((i * 137.508) % 100),
  y:     ((i * 73.314)  % 100),
  size:  2 + (i % 4) * 2,
  delay: i * 2,
  opacity: 0.12 + (i % 4) * 0.07,
}));

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Ambient glow pulses slowly ──────────────────────────────────────────
  const glowScale = interpolate(frame, [0, 120], [0.85, 1.12], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Divider line sweeps in after logo settles (f 58 → 74) ───────────────
  const lineWidth = interpolate(frame, [58, 74], [0, 320], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Tagline rises after line (f 72 → 88) ────────────────────────────────
  const taglineOpacity = interpolate(frame, [72, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [72, 88], [18, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>

      {/* Ambient radial glow — pulses gently */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          width: 700, height: 700, borderRadius: "50%",
          transform: `scale(${glowScale})`,
          background: `radial-gradient(ellipse at center,
            rgba(234, 56, 76, 0.13) 0%,
            rgba(222, 17, 22, 0.06) 40%,
            transparent 70%)`,
        }} />
      </div>

      {/* Background particles */}
      {PARTICLES.map((p, i) => {
        const pOpacity = interpolate(frame, [p.delay, p.delay + 20], [0, p.opacity], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: RED,
            opacity: pOpacity,
          }} />
        );
      })}

      {/* ── Centre stack ── */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>

        {/* Animated logo — the star of the show */}
        <AnimatedLogo scale={1.05} animate startFrame={0} />

        {/* Red rule sweeps in */}
        <div style={{
          width: lineWidth, height: 2, borderRadius: 1, marginTop: 36,
          background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
        }} />

        {/* Tagline */}
        <div style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 400, fontSize: 18,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: 5,
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: 24,
        }}>
          Simplifying Complex Transformations
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
