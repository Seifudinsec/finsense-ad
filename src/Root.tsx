import { Composition } from "remotion";
import { FinsenseAd } from "./FinsenseAd";

// Scene durations
const INTRO   = 135;  // 4.5s
const PRODUCT = 120;  // 4s each × 3
const REVIEWS = 150;  // 5s
const CTA     = 135;  // 4.5s
const TRANS   = 18;   // transition overlap × 5

// Total: 135 + 360 + 150 + 135 - 90 = 690 frames = 23.0s
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
