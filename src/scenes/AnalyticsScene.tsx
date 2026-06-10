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
  { value: "99%",  label: "Satisfaction" },
  { value: "50+",  label: "Years Team Exp" },
  { value: "10+",  label: "Top Tier Banks" },
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
        padding: "50px 80px 60px",
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
          Proven Track Record & <br />
          <span style={{ color: RED }}>Digital Growth</span>
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: subOpacity, fontSize: 19,
          color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 44,
        }}>
          Accelerating transformation pipelines for East Africa's financial leaders.
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

          {/* Arrow that projects upward across the bars as they appear */}
          {(() => {
            const n = BAR_DATA.length;
            // overall progress index (float from 0 to n-1)
            const overallStart = 22;
            const overallEnd = 22 + n * 6 + 12;
            const idxF = interpolate(frame, [overallStart, overallEnd], [0, n - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // compute fractional bar height by sampling each bar's current height
            const heights = BAR_DATA.map((bar, i) => {
              const start = 22 + i * 6;
              return interpolate(frame, [start, start + 24], [0, bar.value * 1.25], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
            });

            const lower = Math.floor(idxF);
            const upper = Math.min(n - 1, Math.ceil(idxF));
            const alpha = idxF - lower;
            const hAt = heights[lower] * (1 - alpha) + heights[upper] * alpha;

            // left as percentage
            const leftPct = ((idxF + 0.5) / n) * 100;
            const arrowOpacity = interpolate(frame, [overallStart + 2, overallStart + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // Build a smooth curved arrow path that follows bar tops
            const chartW = 600;
            const chartH = 190;
            const xs = BAR_DATA.map((_, i) => ((i + 0.5) / BAR_DATA.length) * chartW);
            const ys = heights.map((h) => chartH - h);

            // Build quadratic path through midpoints for a smooth curve
            let d = `M ${xs[0]} ${ys[0]}`;
            for (let i = 1; i < xs.length; i++) {
              const cx = (xs[i - 1] + xs[i]) / 2;
              const cy = (ys[i - 1] + ys[i]) / 2;
              d += ` Q ${xs[i - 1]} ${ys[i - 1]} ${cx} ${cy}`;
            }
            // finish to last point
            d += ` T ${xs[xs.length - 1]} ${ys[ys.length - 1]}`;

            // Stroke reveal (use pathLength=100 so we can animate dashoffset cleanly)
            const reveal = interpolate(frame, [overallStart + 4, overallEnd + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const dash = 100 * (1 - reveal);

            // Arrowhead position and rotation (approx using last segment)
            const lx = xs[xs.length - 1];
            const ly = ys[ys.length - 1];
            const px = xs[xs.length - 2];
            const py = ys[ys.length - 2];
            const angle = (Math.atan2(ly - py, lx - px) * 180) / Math.PI;

            return (
              <div style={{ position: "absolute", left: 0, bottom: 0, width: chartW, height: chartH, pointerEvents: "none" }}>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} style={{ overflow: "visible" }}>
                  <path d={d} stroke={LIGHT_RED} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray={100} strokeDashoffset={dash} pathLength={100} opacity={0.98} />
                  {/* Arrowhead — shown when reveal > ~0.6 */}
                  {reveal > 0.15 && (
                    <g transform={`translate(${lx}, ${ly}) rotate(${angle})`} style={{ transformOrigin: "center center", opacity: Math.min(1, (reveal - 0.15) / 0.6) }}>
                      <path d="M0 -10 L28 0 L0 10 Z" fill={LIGHT_RED} />
                    </g>
                  )}
                </svg>
              </div>
            );
          })()}
        </div>

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
                const current = Math.round(interpolate(frame, [startFrame, endFrame], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
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
