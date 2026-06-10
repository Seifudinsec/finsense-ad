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

  // Stable entrance helper: returns constant values after animation ends
  function entrance(fromFrame: number, duration = 12) {
    const start = fromFrame;
    const end = fromFrame + duration;
    if (frame < start) {
      return { progress: 0, y: 20 };
    }
    if (frame >= end) {
      // fully settled — return static constants (no per-frame motion)
      return { progress: 1, y: 0 };
    }
    const progress = interpolate(frame, [start, end], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = interpolate(progress, [0, 1], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
  const urlStart = 66;
  const urlEnd = 84;
  let urlChars: number;
  if (frame < urlStart) {
    urlChars = 0;
  } else if (frame >= urlEnd) {
    urlChars = URL_TEXT.length;
  } else {
    urlChars = Math.floor(
      interpolate(frame, [urlStart, urlEnd], [0, URL_TEXT.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
  }

  const urlOpacity = frame >= 72
    ? 1
    : interpolate(frame, [66, 72], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const cursorVisible = urlChars < URL_TEXT.length && frame % 8 < 4;

  // ── Contact details + pills (f 80 → 90) — using entrance() for stable values ─
  // detailsOpacity removed in favor of detailsEntrance (stable)

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


        {/* ── Logo lockup — replicate Intro entrance animation precisely ── */}
        {(() => {
          const scaleFinal = 0.9;
          const iconSize = 72 * scaleFinal;
          const mainSize = 46 * scaleFinal;
          const subSize = 17 * scaleFinal;
          const iconX = -104; // match AnimatedLogo final offset
          const wrapperShift = -iconX / 2;
          const textClipWidth = 280;

          const iconStart = 0;
          const iconEnd = 20; // ~20 frames for icon scale+fade
          const wordStart = 10;
          const wordEnd = 30; // wordmark 10->30

          let iconScaleAnim: number;
          let iconOpacityAnim: number;
          let glowOpacityAnim: number;

          if (frame < iconStart) {
          iconScaleAnim = 0.4;
          iconOpacityAnim = 0;
          glowOpacityAnim = 0;
          } else if (frame >= iconEnd) {
          iconScaleAnim = 1;
          iconOpacityAnim = 1;
          glowOpacityAnim = 1;
          } else {
          iconScaleAnim = interpolate(frame, [iconStart, iconEnd], [0.4, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          iconOpacityAnim = interpolate(frame, [iconStart, iconEnd], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          glowOpacityAnim = interpolate(frame, [iconStart, iconEnd], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          }

          let wordOpacityAnim: number;
          let wordXAnim: number;
          if (frame < wordStart) {
          wordOpacityAnim = 0;
          wordXAnim = 30;
          } else if (frame >= wordEnd) {
          wordOpacityAnim = 1;
          wordXAnim = 0;
          } else {
          wordOpacityAnim = interpolate(frame, [wordStart, wordEnd], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          wordXAnim = interpolate(frame, [wordStart, wordEnd], [30, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          }

          return (
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 12 }}>
            <div style={{ position: "relative", width: 360, display: "flex", justifyContent: "center" }}>
              {/* radial glow behind logo */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(234,56,76,0.14) 0%, rgba(234,56,76,0.06) 30%, transparent 60%)`,
                opacity: glowOpacityAnim,
                pointerEvents: "none",
              }} />

              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transform: `translateX(${wrapperShift}px)`,
                transformOrigin: "center center",
              }}>

                <div style={{
                  transform: `translateX(${iconX}px) scale(${iconScaleAnim})`,
                  opacity: iconOpacityAnim,
                  flexShrink: 0,
                  width: iconSize,
                  height: iconSize,
                  position: "relative",
                  zIndex: 2,
                  willChange: "transform, opacity",
                }}>
                  {/* icon svg (kept identical) */}
                  <svg width="100%" height="100%" viewBox="0 0 165 163" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
                    <rect x="-0.00265503" y="31.1216" width="128.244" height="132.506" rx="22" fill="white" />
                    <path d="M22.0958 -0.158281C23.173 -0.168365 24.2501 -0.178449 25.3599 -0.188839C26.542 -0.194692 27.7242 -0.200545 28.9421 -0.206576C30.1871 -0.216397 31.4321 -0.226219 32.7148 -0.236338C36.8466 -0.266434 40.9784 -0.288191 45.1102 -0.306812C45.8142 -0.310122 46.5181 -0.313432 47.2434 -0.316842C53.8886 -0.34775 60.5338 -0.374548 67.1791 -0.391546C75.6637 -0.413507 84.1476 -0.455573 92.6319 -0.525495C98.6053 -0.573041 104.579 -0.597282 110.552 -0.604556C114.116 -0.609514 117.678 -0.624484 121.241 -0.664529C125.225 -0.708708 129.207 -0.704625 133.191 -0.696728C134.359 -0.716805 135.527 -0.736883 136.73 -0.757568C144.514 -0.688513 150.024 0.94704 156.077 6.02595C163.308 14.6323 164.328 22.7307 164.319 33.6754C164.325 34.8238 164.332 35.9723 164.339 37.1555C164.358 40.9424 164.362 44.7292 164.364 48.5163C164.37 51.158 164.377 53.7997 164.384 56.4415C164.397 61.9769 164.4 67.5124 164.398 73.0479C164.397 79.4224 164.418 85.7965 164.45 92.1709C164.479 98.3288 164.486 104.487 164.485 110.645C164.487 113.252 164.496 115.86 164.511 118.468C164.531 122.124 164.525 125.779 164.513 129.435C164.524 130.502 164.535 131.568 164.547 132.667C164.478 141.02 162.589 148.153 158.438 155.409C151.27 162.075 144.813 164.532 135.161 164.216C134.16 164.207 133.159 164.199 132.128 164.19C128.967 164.156 125.809 164.081 122.649 164.004C120.491 163.974 118.333 163.946 116.175 163.922C110.918 163.856 105.662 163.755 100.405 163.627C99.7013 161.875 98.9975 160.123 98.2936 158.371C96.8837 155.505 95.1522 154.196 92.4521 152.585C88.5464 151.636 86.2267 151.324 82.4059 152.664C76.856 152.551 74.9592 149.798 71.2082 145.894C70.3656 144.976 69.5231 144.058 68.6549 143.112C67.7854 142.197 66.9159 141.283 66.0201 140.341C63.8763 138.082 61.7532 135.806 59.6456 133.513C59.9096 132.991 60.1736 132.47 60.4455 131.932C60.9722 130.882 60.9722 130.882 61.5096 129.811C61.8556 129.124 62.2016 128.437 62.5581 127.729C63.6872 125.345 64.6622 122.925 65.6104 120.463C69.9796 120.229 74.3472 120.087 78.7206 119.961C80.5784 119.86 80.5784 119.86 82.4738 119.757C91.5121 119.561 91.5121 119.561 94.2797 122.216C95.5471 124.384 95.5471 124.384 96.4299 126.558C97.693 129.02 98.8698 129.536 101.399 130.501C105.602 131.086 109.274 130.948 113.205 129.309C116.186 126.741 117.995 124.547 118.583 120.537C118.777 116.01 118.198 113.056 115.317 109.421C112.249 106.43 109.628 105.57 105.376 105.405C101.495 106.305 98.3521 107.447 95.5588 110.362C94.4765 112.365 93.4629 114.406 92.4521 116.447C83.5943 116.447 74.7366 116.447 65.6104 116.447C61.6338 106.409 61.6338 106.409 60.6397 101.39C62.0028 99.3901 62.0028 99.3901 64.0571 97.5001C64.7849 96.8169 65.5128 96.1336 66.2628 95.4297C72.2299 90.1274 72.2299 90.1274 74.9887 87.7833C76.6603 86.3977 76.6603 86.3977 77.54 84.3248C78.1769 84.4206 78.8139 84.5163 79.4701 84.615C84.9345 85.3222 89.2832 85.6694 94.4404 83.321C97.4794 80.644 99.0512 79.0799 99.8538 75.106C100.123 69.7245 99.0337 66.3795 95.4345 62.2405C91.2501 59.6682 87.2878 59.5473 82.5107 60.2328C79.3723 61.8462 77.347 63.2186 75.179 66.0049C74.0291 70.1847 74.0074 74.5319 75.295 78.6555C75.5518 81.3133 75.5518 81.3133 74.0851 83.5577C73.3555 84.2948 72.6259 85.0319 71.8742 85.7913C71.0816 86.5949 70.289 87.3985 69.4724 88.2264C68.2066 89.4628 68.2066 89.4628 66.9152 90.7242C66.0905 91.5718 65.2659 92.4194 64.4163 93.2926C59.7866 97.9037 59.7866 97.9037 57.6573 99.3823C52.8781 98.1758 48.3133 96.2105 43.7394 94.3631C43.7394 85.0877 43.7394 75.8123 43.7394 66.2558C45.7078 65.262 47.6762 64.2682 49.7042 63.2443C53.0117 60.2501 53.4036 56.7522 53.7468 52.4532C53.6475 49.058 52.5907 46.939 50.6983 44.1715C46.7876 40.5271 43.5334 40.6552 38.4037 40.8071C34.814 41.2911 33.1318 42.3839 30.8156 45.1754C28.5782 49.1559 28.3561 52.7006 28.8273 57.2214C31.5252 62.6696 33.0543 63.3708 38.7687 66.2558C38.7687 75.5312 38.7687 84.8066 38.7687 94.3631C28.8273 98.3784 28.8273 98.3784 24.8508 99.3823C21.3574 97.1412 18.5415 94.0807 15.5929 91.1634C14.3271 90.0153 14.3271 90.0153 13.0357 88.844C7.09263 82.9885 7.09263 82.9885 6.69928 78.1548C7.01844 74.9335 7.01844 74.9335 7.59317 71.9605C7.9899 68.9699 7.70308 67.733 6.27284 65.1265C4.09963 62.3984 3.03274 61.5879 -0.00265428 60.2328C-0.101281 54.2142 -0.173278 48.1961 -0.221093 42.1769C-0.241035 40.1312 -0.26813 38.0856 -0.302643 36.0402C-0.351124 33.0922 -0.373493 30.1449 -0.390989 27.1966C-0.411513 26.2887 -0.432037 25.3808 -0.453183 24.4454C-0.455764 17.0257 1.39871 12.9083 6.3971 7.34348C11.6502 2.55668 14.8954 -0.105299 22.0958 -0.158281Z" fill="#DE1116" />
                  </svg>
                </div>

                <div style={{
                  overflow: "hidden",
                  width: textClipWidth,
                  opacity: 1,
                  marginLeft: iconX + 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: mainSize,
                    color: "white",
                    letterSpacing: 2 * scaleFinal,
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transform: `translate3d(${wordXAnim}px, 0, 0)`,
                    opacity: wordOpacityAnim,
                    willChange: "transform, opacity",
                  }}>
                    FIN<span style={{ color: "#DE1116" }}>SENSE</span>
                  </div>

                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: subSize,
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: 5 * scaleFinal,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    marginTop: 1 * scaleFinal,
                    transform: `translate3d(${wordXAnim}px, 0, 0)`,
                    opacity: wordOpacityAnim,
                    willChange: "transform, opacity",
                  }}>
                    AFRICA
                  </div>
                </div>

              </div>
            </div>
          </div>
          );
        })()}

        {/* ── "Ready to co-create your future?" ── */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
          transform: `translate3d(0, ${taglineEntrance.y}px, 0)`,
          opacity: taglineEntrance.progress,
          willChange: "transform, opacity",
          fontWeight: 300, fontSize: 22,
          color: "rgba(255,255,255,0.52)", letterSpacing: 1, marginBottom: 6,
          }}>
          Built for Fintechs, Banks, SACCOs, and Telcos That Refuse to Compromise
          </div>
          <div style={{
            transform: `translate3d(0, ${headlineEntrance.y}px, 0)`,
            opacity: headlineEntrance.progress,
            willChange: "transform, opacity",
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
          transform: `translate3d(0, ${servicesEntrance.y}px, 0)`,
          willChange: "transform, opacity",
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
          transform: `translate3d(0, ${ctaEntrance.y}px, 0)`,
          willChange: "transform, opacity",
          transformOrigin: "center center",
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
          transform: `translate3d(0, ${detailsEntrance.y}px, 0)`,
          willChange: "transform, opacity",
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
          transform: `translate3d(0, ${pillsEntrance.y}px, 0)`,
          willChange: "transform, opacity",
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
            const start = socialStart + delay;
            const end = start + 12;

            let opacity: number;
            let y: number;
            let scale: number;

            if (frame < start) {
              opacity = 0;
              y = 12;
              scale = 0.9;
            } else if (frame >= end) {
              // settled
              opacity = 1;
              y = 0;
              scale = 1;
            } else {
              opacity = interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const yRaw = interpolate(frame, [start, end], [12, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              y = Math.round(yRaw * 10) / 10;
              const scaleRaw = interpolate(frame, [start, end], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              scale = Math.round(scaleRaw * 1000) / 1000;
            }

            return (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 28, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.04)", opacity, transform: `translate3d(0, ${y}px, 0) scale(${scale})`, willChange: "transform, opacity", transition: "none" }}>
                {s.component}
              </div>
            );
          })}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
