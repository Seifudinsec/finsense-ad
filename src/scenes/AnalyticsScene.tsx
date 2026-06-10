import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const DARK_RED = "#DE1117";
const LIGHT_RED = "#f87171";
const BG = "#080808";

const BAR_DATA = [
  { label: "2021", value: 38,  color: DARK_RED },
  { label: "2022", value: 55,  color: DARK_RED },
  { label: "2023", value: 72,  color: DARK_RED },
  { label: "2024", value: 98,  color: RED  }, // Highlighted award-finalist year
  { label: "2025", value: 118, color: LIGHT_RED },
  { label: "2026", value: 145, color: "#ffffff" }, // Peak
];

const STATS = [
  { value: "95%", label: "Satisfaction" },
  { value: "41+", label: "Years Team Exp" },
  { value: "7+",  label: "Top Tier Banks" },
];

export const AnalyticsScene: React.FC = () => {
  const frame = useCurrentFrame();

  /* Title */
  const titleOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 16], [-22, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Subtitle */
  const subOpacity = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  /* Bottom stats row */
  const statsOpacity = interpolate(frame, [56, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>

      {/* Subtle horizontal grid lines */}
      {[0, 25, 50, 75, 100].map((pct, i) => {
        const gOpacity = interpolate(frame, [i * 3, i * 3 + 12], [0, 0.08], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{
            position: "absolute", left: 60, right: 60,
            top: `${20 + pct * 0.44}%`,
            height: 1, background: "white", opacity: gOpacity,
          }} />
        );
      })}

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingTop: 50, paddingBottom: 60, paddingLeft: 48, paddingRight: 48, width: "100%", boxSizing: "border-box",
      }}>

        {/* Section indicator */}
        <div style={{
          opacity: titleOpacity, fontWeight: 600, fontSize: 13, color: RED,
          letterSpacing: 5, textTransform: "uppercase", marginBottom: 12,
        }}>
          Scale & Impact
        </div>

        {/* Headline */}
        <div style={{
          transform: `translateY(${titleY}px)`, opacity: titleOpacity,
          fontWeight: 900, fontSize: 64, color: "white",
          letterSpacing: -2, textAlign: "center", lineHeight: 1.05, marginBottom: 12,
        }}>
          East Africa's Financial Leaders Choose FinSense
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: subOpacity, fontSize: 19,
          color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 44,
        }}>
          99% project success · 95% satisfaction · 7+ top-tier banks
        </div>

        {/* Bar chart representing deployments/integrations */}
        <div style={{ position: "relative", width: "100%", maxWidth: 600 }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            gap: 12, height: 190, marginBottom: 18,
            width: "100%",
          }}>
            {BAR_DATA.map((bar, i) => {
              const start = 22 + i * 6;
              const h = interpolate(frame, [start, start + 24], [0, bar.value * 1.25], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              const bOpacity = interpolate(frame, [start, start + 10], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              const glow =
                bar.color === RED  ? `0 0 22px rgba(234, 56, 76, 0.4)` :
                bar.color === LIGHT_RED  ? `0 0 22px rgba(234, 56, 76, 0.3)` : "none";

              return (
                <div key={i} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 6, flex: 1,
                }}>
                  <div style={{
                    width: "100%", height: h, minWidth: 48,
                    background: bar.color, borderRadius: "6px 6px 0 0",
                    opacity: bOpacity, boxShadow: glow,
                  }} />
                  <span style={{
                    fontSize: 13, color: "rgba(255,255,255,0.42)", opacity: bOpacity,
                  }}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* growth curve removed - only animated bars remain */}        </div>

        {/* Stats row */}
        <div style={{
          opacity: statsOpacity, display: "flex", gap: 56, marginTop: 14,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              {/* animate number from 0 to target */}
              {(() => {
                // derive numeric target and suffix
                const raw = s.value.toString();
                const plus = raw.includes("+");
                const percent = raw.includes("%");
                const target = parseInt(raw.replace(/[^0-9]/g, "")) || 0;
                const startFrame = 56 + i * 4;
                const endFrame = startFrame + 28;
                const current = Math.floor(interpolate(frame, [startFrame, endFrame], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
                const display = percent ? `${current}%` : plus ? `${current}+` : `${current}`;
                return (
                  <div style={{
                    fontWeight: 900, fontSize: 38, color: RED,
                    letterSpacing: -1, lineHeight: 1,
                    textShadow: `0 0 20px rgba(234, 56, 76, 0.25)`,
                  }}>{display}</div>
                );
              })()}

              <div style={{
                fontSize: 12, color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase", letterSpacing: 2, marginTop: 6,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
