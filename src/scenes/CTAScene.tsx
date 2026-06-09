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
const BG_GRADIENT = "linear-gradient(155deg, #080808 0%, #1e0507 48%, #0d0d0d 100%)";

const URL_TEXT = "finsense.co.ke";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  /* Logo */
  const logoOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Headline copy */
  const headlineOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [18, 36], [32, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Sub line */
  const subOpacity = interpolate(frame, [34, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* CTA button */
  const ctaOpacity = interpolate(frame, [48, 62], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [48, 62], [0.82, 1], {
    easing: Easing.bezier(0.34, 1.3, 0.64, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Subtle pulse after button lands */
  const pulse = interpolate(frame, [68, 90], [1, 1.035], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* URL typewriter */
  const urlChars = Math.floor(
    interpolate(frame, [64, 82], [0, URL_TEXT.length], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  );
  const urlOpacity = interpolate(frame, [64, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cursorVisible = urlChars < URL_TEXT.length && frame % 8 < 4;

  /* Platform/Industry pills */
  const pillsOpacity = interpolate(frame, [74, 86], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{
      background: BG_GRADIENT,
      overflow: "hidden",
      fontFamily,
    }}>

      {/* Central radial glow */}
      <div style={{
        position: "absolute",
        top: "28%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 820, height: 820, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.12) 0%, transparent 62%)`,
      }} />

      {/* Top-right corner accent */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.05) 0%, transparent 70%)`,
      }} />

      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* FS logo mark */}
        <div style={{
          opacity: logoOpacity,
          marginBottom: 26,
        }}>
          <FinSenseLogo size={108} color={RED} animate={true} />
        </div>

        {/* Headline callout */}
        <div style={{
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          textAlign: "center", marginBottom: 14,
        }}>
          <div style={{
            fontWeight: 300, fontSize: 24,
            color: "rgba(255,255,255,0.55)", letterSpacing: 1, marginBottom: 6,
          }}>
            Ready to co-create your future?
          </div>
          <div style={{
            fontWeight: 900, fontSize: 72, color: "white",
            letterSpacing: -3, lineHeight: 1.1,
            textShadow: `0 0 60px rgba(234, 56, 76, 0.25)`,
          }}>
            Partner with <br />
            <span style={{ color: RED }}>FinSense Africa</span>
          </div>
        </div>

        {/* Product summary line */}
        <div style={{
          opacity: subOpacity,
          fontSize: 17, color: "rgba(255,255,255,0.5)",
          textAlign: "center", marginTop: 14, marginBottom: 38,
          letterSpacing: 1,
        }}>
          Core Banking · APIs · Middleware · DevOps · Cloud
        </div>

        {/* CTA button */}
        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulse})`,
          background: RED,
          borderRadius: 100, padding: "18px 56px",
          fontSize: 20, fontWeight: 700, color: "white",
          letterSpacing: 0.5, marginBottom: 28,
          boxShadow: `0 0 48px rgba(234, 56, 76, 0.35)`,
          cursor: "default",
        }}>
          Start the Conversation Today →
        </div>

        {/* Website URL with typewriter */}
        <div style={{
          opacity: urlOpacity,
          fontSize: 18, color: LIGHT_RED,
          fontWeight: 600, letterSpacing: 1,
          marginBottom: 16,
        }}>
          🌐 {URL_TEXT.slice(0, urlChars)}
          {cursorVisible && (
            <span style={{ color: "white", fontWeight: 300 }}>|</span>
          )}
        </div>

        {/* Email & Phone numbers */}
        <div style={{
          opacity: pillsOpacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          fontSize: 15, color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: 0.5,
          marginBottom: 30
        }}>
          <div>📧 sales@finsense.co.ke</div>
          <div>📞 +254 756 444 444</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>📍 Westside Towers, Westlands, Nairobi</div>
        </div>

        {/* Platform pills */}
        <div style={{
          opacity: pillsOpacity,
          display: "flex", gap: 12,
        }}>
          {["Banks", "Fintechs", "SACCOs", "Telcos"].map((p) => (
            <div key={p} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 100, padding: "7px 18px",
              fontSize: 13, color: "rgba(255,255,255,0.5)",
              fontWeight: 500, letterSpacing: 0.5,
            }}>
              {p}
            </div>
          ))}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
