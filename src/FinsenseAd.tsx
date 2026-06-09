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

const T = 24; // transition duration in frames
 
export const FinsenseAd: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1 — Brand Intro */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <IntroScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 2 — Core Banking & APIs */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <PaymentsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 3 — DevOps & Cloud */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <CreditScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 4 — Proven Impact */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AnalyticsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 5 — Customer Reviews & Partners */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ReviewsScene />
        </TransitionSeries.Sequence>
 
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
 
        {/* Scene 6 — CTA */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
