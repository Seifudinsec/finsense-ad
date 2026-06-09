import { Composition } from "remotion";
import { FinsenseAd } from "./FinsenseAd";

// Scene durations
const INTRO   = 120;  // 4s
const PRODUCT = 90;   // 3s each × 3
const REVIEWS = 90;   // 3s
const CTA     = 120;  // 4s
const TRANS   = 24;   // transition overlap × 5

// Total: 120 + 270 + 90 + 120 - 120 = 480 frames = 16.0s
const TOTAL = INTRO + PRODUCT * 3 + REVIEWS + CTA - TRANS * 5;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FinsenseAd"
      component={FinsenseAd}
      durationInFrames={TOTAL}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
