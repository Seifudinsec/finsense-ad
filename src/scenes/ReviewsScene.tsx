import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import dtbLogo from "../assets/logos/dtb.png";
import kcbLogo from "../assets/logos/kcb.png";
import ncbaLogo from "../assets/logos/ncba.png";
import equityLogo from "../assets/logos/equity.png";
import ipslLogo from "../assets/logos/ipsl.png";
import azeniaLogo from "../assets/logos/azenia.png";
import dibLogo from "../assets/logos/dib.png";
import crescentechLogo from "../assets/crescentech.png";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

const RED = "#ea384c";
const LIGHT_RED = "#f87171";
const BG = "#080808";
const CARD_W = 600;
const CARD_GAP = 40;
const ROW_SPAN = (CARD_W + CARD_GAP) * 6;

const TESTIMONIALS = [
  {
    logo: dtbLogo,
    quote:
      "FinSense exhibited professionalism, dedication, and flexibility in supplying developers to meet our staffing needs with precision.",
    org: "Diamond Trust Bank",
    role: "Chief Operating Officer",
  },
  {
    logo: kcbLogo,
    quote:
      "We have been very satisfied with the new age microservices-based middleware solution delivered with FinSense Africa.",
    org: "KCB Bank Kenya",
    role: "Head of Digital Financial Services",
  },
  {
    logo: ncbaLogo,
    quote:
      "FinSense Africa has the technical expertise and professional support to offer core systems consultancy and architecture review.",
    org: "NCBA Group",
    role: "Group Director - Technology and Operations",
  },
  {
    logo: ipslLogo,
    quote:
      "Their business and technical expertise met the standards expected while delivering Kubernetes infrastructure.",
    org: "IPSL",
    role: "Chief Technology Officer",
  },
  {
    logo: dibLogo,
    quote:
      "Their attention to detail, proactive approach, and problem-solving skills ensured seamless API integration.",
    org: "Dubai Islamic Bank",
    role: "Head of IT",
  },
  {
    logo: kcbLogo,
    quote:
      "FinSense helped streamline deployments, reduce silos and manual effort, and improve engineering visibility.",
    org: "KCB Bank Kenya",
    role: "Head of Business Services and Solutions",
  },
];

const TRUST_LOGOS = [
  { src: dtbLogo, label: "Diamond Trust Bank" },
  { src: kcbLogo, label: "KCB" },
  { src: ncbaLogo, label: "NCBA" },
  { src: equityLogo, label: "Equity" },
  { src: ipslLogo, label: "IPSL" },
  { src: azeniaLogo, label: "Azenia" },
  { src: dibLogo, label: "Dubai Islamic Bank" },
];

const TESTIMONIAL_LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

const STAR_FIELD = Array.from({ length: 30 }, (_, i) => ({
  x: (i * 131.7) % 100,
  y: (i * 71.3) % 100,
  size: 1 + (i % 3),
  delay: i * 2,
  color: i % 6 === 0 ? RED : i % 5 === 0 ? "#13b8ad" : "#ffffff",
}));

const TestimonialCard: React.FC<(typeof TESTIMONIALS)[number]> = ({
  logo,
  quote,
  org,
  role,
}) => {
  return (
    <div
      style={{
        flex: `0 0 ${CARD_W}px`,
        height: 180,
        display: "flex",
        gap: 20,
        padding: "24px 28px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",
        border: "1px solid rgba(255,255,255,0.11)",
        borderRadius: 18,
        boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: 999,
          background: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Img
          src={logo}
          style={{
            maxWidth: 54,
            maxHeight: 40,
            objectFit: "contain",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            fontSize: 19,
            lineHeight: 1.38,
            color: "rgba(255,255,255,0.76)",
            fontWeight: 400,
            height: 104,
            overflow: "hidden",
          }}
        >
          "{quote}"
        </div>
        <div
          style={{
            color: LIGHT_RED,
            fontSize: 17,
            fontWeight: 800,
            marginTop: 8,
          }}
        >
          {org}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.42)",
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
};

const MarqueeRow: React.FC<{
  direction: "left" | "right";
  offset: number;
  opacity: number;
}> = ({ direction, offset, opacity }) => {
  const frame = useCurrentFrame();
  const distance = interpolate(frame + offset, [0, 1500], [0, ROW_SPAN], {
    extrapolateLeft: "extend",
    extrapolateRight: "extend",
  });
  const shift =
    direction === "left"
      ? -1 * (distance % ROW_SPAN)
      : -ROW_SPAN + (distance % ROW_SPAN);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 192,
        overflow: "hidden",
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: CARD_GAP,
          transform: `translate3d(${shift}px, 0, 0)`,
          willChange: "transform",
        }}
      >
        {TESTIMONIAL_LOOP.map((t, i) => (
          <TestimonialCard key={`${direction}-${i}`} {...t} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 150,
          background: "linear-gradient(90deg, #080808 0%, rgba(8,8,8,0) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 150,
          background: "linear-gradient(270deg, #080808 0%, rgba(8,8,8,0) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export const ReviewsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 15], [-18, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rowsOpacity = interpolate(frame, [10, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoBandOpacity = interpolate(frame, [56, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoBandY = interpolate(frame, [56, 74], [24, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const partnerSpring = spring({
    frame,
    fps,
    delay: 84,
    config: { damping: 15, mass: 0.7, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 16% 18%, rgba(234,56,76,0.12), transparent 33%), radial-gradient(circle at 88% 36%, rgba(19,184,173,0.1), transparent 36%), linear-gradient(180deg, #070707 0%, #090406 54%, #070707 100%)",
        }}
      />

      {STAR_FIELD.map((star, i) => {
        const opacity = interpolate(frame, [star.delay, star.delay + 18], [0, 0.42], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: 999,
              background: star.color,
              opacity,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            width: "100%",
            maxWidth: 960,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "white",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            <span style={{ color: RED, fontSize: 48, lineHeight: 1 }}>›</span>
            Trusted by top industry leaders
          </div>
          <div
            style={{
              color: LIGHT_RED,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            Proven outcomes
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
          <MarqueeRow direction="left" offset={0} opacity={rowsOpacity} />
          <MarqueeRow direction="right" offset={34} opacity={rowsOpacity} />
        </div>

        <div
          style={{
            transform: `translateY(${logoBandY}px)`,
            opacity: logoBandOpacity,
            width: 960,
            marginTop: 38,
            padding: "18px 34px 22px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.94)",
            boxShadow: "0 18px 42px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              color: "#5d6676",
              fontSize: 19,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            Trusted by leading financial institutions across East Africa
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 22,
            }}
          >
            {TRUST_LOGOS.map((logo) => (
              <Img
                key={logo.label}
                src={logo.src}
                alt={logo.label}
                style={{
                  width: 104,
                  height: 42,
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            transform: `scale(${partnerSpring}) translateY(${interpolate(
              partnerSpring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: partnerSpring,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            width: 820,
            marginTop: 36,
            padding: "22px 34px",
            borderRadius: 20,
            background:
              "linear-gradient(135deg, rgba(234,56,76,0.16), rgba(255,255,255,0.055))",
            border: "1px solid rgba(234,56,76,0.3)",
            boxShadow: "0 18px 44px rgba(234,56,76,0.1)",
          }}
        >
          <div>
            <div
              style={{
                color: LIGHT_RED,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 7,
              }}
            >
              Strategic Partner
            </div>
            <div
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: 900,
                lineHeight: 1.1,
              }}
            >
              Crescentech engineered delivery
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.52)",
                fontSize: 14,
                fontWeight: 500,
                marginTop: 6,
              }}
            >
              Domain expertise for bank-grade transformation.
            </div>
          </div>

          <div
            style={{
              width: 254,
              height: 78,
              borderRadius: 14,
              background: "rgba(255,255,255,0.98)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 22px",
            }}
          >
            <Img
              src={crescentechLogo}
              alt="Crescentech"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
