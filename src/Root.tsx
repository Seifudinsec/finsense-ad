import { Composition } from "remotion";
import { FinSenseAd } from "./FinsenseAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FinSenseAd"
      durationInFrames={885}
      fps={30}
      width={1080}
      height={1080}
      component={FinSenseAd}
    />
  );
};
