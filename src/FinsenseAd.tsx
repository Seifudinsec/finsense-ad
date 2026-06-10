import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./scenes/IntroScene";
import { PaymentsScene } from "./scenes/PaymentsScene";
import { CreditScene } from "./scenes/CreditScene";
import { AnalyticsScene } from "./scenes/AnalyticsScene";
import { ReviewsScene } from "./scenes/ReviewsScene";
import { CTAScene } from "./scenes/CTAScene";
import { BackgroundDots } from "./components/BackgroundDots";

const T = 15; // transition duration in frames
const INTRO = 45;
const PRODUCT = 180;
const TRACK = 150;
const REVIEWS = 150;
const CTA = 180;
 
export const FinSenseAd: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundDots />
      <TransitionSeries>
        {/* Scene 1 — Brand Intro */}
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <IntroScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 2 — Core Banking & APIs */}
        <TransitionSeries.Sequence durationInFrames={PRODUCT}>
          <PaymentsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 3 — DevOps & Cloud */}
        <TransitionSeries.Sequence durationInFrames={PRODUCT}>
          <CreditScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 4 — Proven Impact */}
        <TransitionSeries.Sequence durationInFrames={TRACK}>
          <AnalyticsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 5 — Customer Reviews & Partners */}
        <TransitionSeries.Sequence durationInFrames={REVIEWS}>
          <ReviewsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 6 — CTA */}
        <TransitionSeries.Sequence durationInFrames={CTA}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
