import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { GlobeIcon, MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from "../components/Icons";

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
  const { fps } = useVideoConfig();

  // Entrance timing (staggered)
  const logoFrom = 0;
  const taglineFrom = Math.round(0.3 * fps);
  const headlineFrom = Math.round(0.6 * fps);
  const servicesFrom = Math.round(1.0 * fps);
  const ctaFrom = Math.round(1.5 * fps);
  const contactFrom = Math.round(2.2 * fps);
  const pillsFrom = Math.round(2.8 * fps);

  function entrance(fromFrame: number) {
    const progress = interpolate(frame, [fromFrame, fromFrame + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const y = interpolate(progress, [0, 1], [20, 0]);
    return { progress, y };
  }

  const logoEntrance = entrance(logoFrom);
  const taglineEntrance = entrance(taglineFrom);
  const headlineEntrance = entrance(headlineFrom);
  const servicesEntrance = entrance(servicesFrom);
  const ctaEntrance = entrance(ctaFrom);
  const detailsEntrance = entrance(contactFrom);
  const pillsEntrance = entrance(pillsFrom);

  // ── Stable logo scale (no sinusoidal pulse to avoid micro-jitter)
  const logoScale = 1;

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
        paddingLeft: 48, paddingRight: 48, width: "100%", boxSizing: "border-box",
      }}>


        {/* ── Animated logo above headline (moved down) ── */}
        <div style={{ opacity: logoEntrance.progress, transform: `translateY(${logoEntrance.y}px) scale(${logoScale})`, marginBottom: 12, willChange: "transform, opacity" }}>
          <AnimatedLogo scale={0.9} animate={false} startFrame={0} />
        </div>

        {/* ── "Ready to co-create your future?" ── */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
            transform: `translateY(${taglineEntrance.y}px)`,
            opacity: taglineEntrance.progress,
            fontWeight: 300, fontSize: 22,
            color: "rgba(255,255,255,0.52)", letterSpacing: 1, marginBottom: 6,
          }}>
            Built for Fintechs, Banks, SACCOs, and Telcos That Refuse to Compromise
          </div>
          <div style={{
            transform: `translateY(${headlineEntrance.y}px)`,
            opacity: headlineEntrance.progress,
            fontWeight: 900, fontSize: 64, color: "white",
            letterSpacing: -2.5, lineHeight: 1.1,
            textShadow: `0 0 60px rgba(234, 56, 76, 0.22)`,
          }}>
            Partner with <span style={{ color: RED }}>Us</span>
          </div>
        </div>

        {/* ── Services line ── */}
        <div style={{
          opacity: servicesEntrance.progress,
          transform: `translateY(${servicesEntrance.y}px)`,
          fontSize: 16, color: "rgba(255,255,255,0.48)",
          textAlign: "center", marginTop: 12, marginBottom: 36,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}>
          Core Banking · APIs · Middleware · DevOps · Cloud
        </div>

        {/* ── CTA button ── */}
        <div style={{
          opacity: ctaEntrance.progress,
          transform: `translateY(${ctaEntrance.y}px)`,
          background: RED,
          borderRadius: 100, padding: "17px 54px",
          fontSize: 20, fontWeight: 700, color: "white",
          letterSpacing: 0.5, marginBottom: 28,
          boxShadow: `0 0 44px rgba(234, 56, 76, 0.38)`,
          cursor: "default",
        }}>
          Book a Free Discovery Call →
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
          opacity: detailsEntrance.progress,
          transform: `translateY(${detailsEntrance.y}px)`,
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
          opacity: pillsEntrance.progress,
          transform: `translateY(${pillsEntrance.y}px)`,
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

        {/* Social icons row (inline under content) - animated entrance */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          marginTop: 8,
          zIndex: 4,
        }}>
          {[
            { component: <FacebookIcon size={20} color="rgba(255,255,255,0.85)" /> },
            { component: <TwitterIcon size={20} color="rgba(255,255,255,0.85)" /> },
            { component: <InstagramIcon size={20} color="rgba(255,255,255,0.85)" /> },
            { component: <LinkedInIcon size={20} color="rgba(255,255,255,0.85)" /> },
          ].map((s, i) => {
            const socialStart = 92; // shortly after details reveal
            const delay = i * 6;
            const opacity = interpolate(frame, [socialStart + delay, socialStart + delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [socialStart + delay, socialStart + delay + 12], [12, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const scale = interpolate(frame, [socialStart + delay, socialStart + delay + 12], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 28, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.04)", opacity, transform: `translateY(${y}px) scale(${scale})`, transition: "none" }}>
                {s.component}
              </div>
            );
          })}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
