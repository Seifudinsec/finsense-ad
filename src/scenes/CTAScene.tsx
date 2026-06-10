import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { GlobeIcon, MailIcon, PhoneIcon, MapPinIcon } from "../components/Icons";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const RED       = "#ea384c";
const LIGHT_RED = "#f87171";
const BG_GRADIENT = "linear-gradient(155deg, #080808 0%, #1e0507 48%, #0d0d0d 100%)";
const URL_TEXT    = "finsense.co.ke";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Logo: runs its own reveal from frame 0 (scaled down slightly) ────────
  // In the CTA we use the same AnimatedLogo but smaller (scale 0.75)
  const logoContainerOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Subtle logo pulse after it lands (f 62 → 80 → 62 → 80 …) ───────────
  // We use a slow sine-like interpolate to create a breathing pulse
  const pulse = interpolate(
    Math.sin((frame - 62) * 0.08),
    [-1, 1], [0.98, 1.03], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    }
  );
  const logoScale = frame < 62 ? 1 : pulse;

  // ── Headline (f 20 → 38) ────────────────────────────────────────────────
  const headlineOpacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [20, 38], [32, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Sub-line (f 36 → 52) ────────────────────────────────────────────────
  const subOpacity = interpolate(frame, [36, 52], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── CTA button (f 50 → 64) ──────────────────────────────────────────────
  const ctaOpacity = interpolate(frame, [50, 64], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [50, 64], [0.82, 1], {
    easing: Easing.bezier(0.34, 1.3, 0.64, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── URL typewriter (f 66 → 84) ──────────────────────────────────────────
  const urlChars = Math.floor(
    interpolate(frame, [66, 84], [0, URL_TEXT.length], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  );
  const urlOpacity = interpolate(frame, [66, 72], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cursorVisible = urlChars < URL_TEXT.length && frame % 8 < 4;

  // ── Contact details + pills (f 80 → 90) ─────────────────────────────────
  const detailsOpacity = interpolate(frame, [80, 92], [0, 1], {
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
        position: "absolute", top: "28%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 820, height: 820, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.11) 0%, transparent 62%)`,
        pointerEvents: "none",
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>

        {/* ── Animated logo lockup ── */}
        <div style={{
          opacity: logoContainerOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 32,
        }}>
          <AnimatedLogo scale={0.78} animate startFrame={0} />
        </div>

        {/* ── "Ready to co-create your future?" ── */}
        <div style={{
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          textAlign: "center",
          marginBottom: 16,
        }}>
          <div style={{
            fontWeight: 300, fontSize: 22,
            color: "rgba(255,255,255,0.52)", letterSpacing: 1, marginBottom: 6,
          }}>
            Ready to co-create your future?
          </div>
          <div style={{
            fontWeight: 900, fontSize: 64, color: "white",
            letterSpacing: -2.5, lineHeight: 1.1,
            textShadow: `0 0 60px rgba(234, 56, 76, 0.22)`,
          }}>
            Partner with <span style={{ color: RED }}>Us</span>
          </div>
        </div>

        {/* ── Services line ── */}
        <div style={{
          opacity: subOpacity,
          fontSize: 16, color: "rgba(255,255,255,0.48)",
          textAlign: "center", marginTop: 12, marginBottom: 36,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}>
          Core Banking · APIs · Middleware · DevOps · Cloud
        </div>

        {/* ── CTA button ── */}
        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          background: RED,
          borderRadius: 100, padding: "17px 54px",
          fontSize: 20, fontWeight: 700, color: "white",
          letterSpacing: 0.5, marginBottom: 28,
          boxShadow: `0 0 44px rgba(234, 56, 76, 0.38)`,
          cursor: "default",
        }}>
          Start the Conversation →
        </div>

        {/* ── Typewriter URL ── */}
        <div style={{
          opacity: urlOpacity,
          fontSize: 18, color: LIGHT_RED,
          fontWeight: 600, letterSpacing: 1,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <GlobeIcon size={18} color={LIGHT_RED} />
          <span>{URL_TEXT.slice(0, urlChars)}</span>
          {cursorVisible && (
            <span style={{ color: "white", fontWeight: 300 }}>|</span>
          )}
        </div>

        {/* ── Contact details ── */}
        <div style={{
          opacity: detailsOpacity,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 5,
          fontSize: 15, color: "rgba(255,255,255,0.52)",
          fontWeight: 500, letterSpacing: 0.5, marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MailIcon size={16} color={"rgba(255,255,255,0.52)"} />
            <span>sales@finsense.co.ke</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <PhoneIcon size={16} color={"rgba(255,255,255,0.52)"} />
            <span>+254 756 444 444</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", display: "flex", alignItems: "center", gap: 8 }}>
            <MapPinIcon size={14} color={"rgba(255,255,255,0.38)"} />
            <span>Westside Towers, Westlands, Nairobi</span>
          </div>
        </div>

        {/* ── Sector pills ── */}
        <div style={{
          opacity: detailsOpacity,
          display: "flex", gap: 10,
        }}>
          {["Banks", "Fintechs", "SACCOs", "Telcos"].map((p) => (
            <div key={p} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 100, padding: "6px 16px",
              fontSize: 13, color: "rgba(255,255,255,0.48)",
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
