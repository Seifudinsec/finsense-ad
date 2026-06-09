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

  /* Headline reveal */
  const headlineOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [80, 100], [30, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Website URL typewriter */
  const urlChars = Math.floor(
    interpolate(frame, [100, 120], [0, URL_TEXT.length], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  );
  const urlOpacity = interpolate(frame, [100, 110], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cursorVisible = urlChars < URL_TEXT.length && frame % 8 < 4;

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

      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Brand logo (Horizontal Reveal) */}
        <div style={{ marginBottom: 50 }}>
          <FinSenseLogo size={120} color={RED} animate={true} />
        </div>

        {/* Headline callout */}
        <div style={{
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          textAlign: "center", marginBottom: 30,
        }}>
          <div style={{
            fontWeight: 300, fontSize: 28,
            color: "rgba(255,255,255,0.55)", letterSpacing: 1, marginBottom: 10,
          }}>
            Ready to co-create your future?
          </div>
          <div style={{
            fontWeight: 900, fontSize: 76, color: "white",
            letterSpacing: -3, lineHeight: 1.1,
          }}>
            Partner with <br />
            <span style={{ color: RED }}>FinSense Africa</span>
          </div>
        </div>

        {/* Website URL with typewriter */}
        <div style={{
          opacity: urlOpacity,
          fontSize: 22, color: LIGHT_RED,
          fontWeight: 600, letterSpacing: 2,
        }}>
          🌐 {URL_TEXT.slice(0, urlChars)}
          {cursorVisible && (
            <span style={{ color: "white", fontWeight: 300 }}>|</span>
          )}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
