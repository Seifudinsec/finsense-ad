import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { BoxIcon, BoltIcon, LockIcon, CloudIcon, CheckIcon } from "../components/Icons";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const DARK_RED = "#DE1117";
const LIGHT_RED = "#f87171";
const BG = "#080808";

const FEATURES = [
  { icon: <BoxIcon size={26} color={RED} />,  text: "Kubernetes & Red Hat Solutions", delay: 32 },
  { icon: <BoltIcon size={26} color={RED} />, text: "Automated CI/CD Pipelines",       delay: 42 },
  { icon: <LockIcon size={26} color={RED} />, text: "VAPT & Security Audits",          delay: 52 },
];

export const CreditScene: React.FC = () => {
  const frame = useCurrentFrame();

  const bannerOpacity = interpolate(frame, [0, 15], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Icon */
  const iconScale = interpolate(frame, [0, 22], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Headline */
  const headlineOpacity = interpolate(frame, [14, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [14, 32], [40, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Trust badge */
  const badgeScale = animateBadge(frame);

  function animateBadge(f: number) {
    return interpolate(f, [70, 82], [0, 1], {
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

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
          2 of 2
        </div>
      </div>

      {/* Bottom-left red glow */}
      <div style={{
        position: "absolute", bottom: -140, left: -140,
        width: 560, height: 560, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234, 56, 76, 0.08) 0%, transparent 68%)`,
      }} />

      {/* Right accent stripe */}
      <div style={{
        position: "absolute", right: 0, top: "15%",
        width: 5, height: "70%", borderRadius: 3,
        background: `linear-gradient(180deg, transparent, ${RED}, transparent)`,
        opacity: headlineOpacity,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingLeft: 48, paddingRight: 48, width: "100%", boxSizing: "border-box",
      }}>

        {/* Cloud icon */}
        <div style={{
          transform: `scale(${iconScale})`,
          width: 72,
          height: 72,
          marginBottom: 20,
          filter: `drop-shadow(0 0 18px rgba(234, 56, 76, 0.35))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <CloudIcon size={72} color={RED} />
        </div>

        {/* Product label */}
        <div style={{
          opacity: headlineOpacity,
          fontWeight: 600, fontSize: 13, color: RED,
          letterSpacing: 5, textTransform: "uppercase", marginBottom: 12,
        }}>
          Infrastructure & SecOps
        </div>

        {/* Headline */}
        <div style={{
          transform: `translateY(${headlineY}px)`, opacity: headlineOpacity,
          fontWeight: 900, fontSize: 64, color: "white",
          letterSpacing: -2, textAlign: "center", lineHeight: 1.05, marginBottom: 36,
        }}>
          DevOps &<br />
          <span style={{ color: RED }}>Cloud Systems</span>
        </div>

        {/* Feature cards */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: 14, marginBottom: 38, width: "100%", maxWidth: 500,
        }}>
          {FEATURES.map((f, i) => {
            const fOpacity = interpolate(frame, [f.delay, f.delay + 14], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            const fX = interpolate(frame, [f.delay, f.delay + 18], [-28, 0], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            return (
              <div key={i} style={{
                opacity: fOpacity,
                transform: `translateX(${fX}px)`,
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: "14px 20px",
              }}>
                <span style={{ fontSize: 26 }}>{f.icon}</span>
                <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                  {f.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Trust badge */}
        <div style={{
          transform: `scale(${badgeScale})`,
          opacity: badgeScale,
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(234, 56, 76, 0.08)",
          border: `1px solid ${RED}`,
          borderRadius: 100, padding: "13px 30px",
        }}>
          <span style={{ fontSize: 22, color: RED }}><CheckIcon size={22} color={RED} /></span>
          <span style={{ fontSize: 17, fontWeight: 700, color: LIGHT_RED, letterSpacing: 0.5 }}>
            Trusted by KCB Bank, DTB & NCBA
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
