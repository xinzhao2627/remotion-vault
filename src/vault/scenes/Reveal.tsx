import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Film, Phone, Library, ease } from "../components/Film";
import { MediaLayer, type ClipProps } from "../components/MediaLayer";
export type { ClipProps } from "../components/MediaLayer";

export const Reveal = ({
  file,
  trimSeconds,
  camera,
  holdAfterSeconds,
}: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Film pending={!file}>
      <Interactive.Div
        name="Vault hero wordmark"
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 168,
          fontWeight: 600,
          letterSpacing: "-0.07em",
          lineHeight: 1,
        }}
      >
        Vault.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 162,
          top: 466,
          fontSize: 65,
          lineHeight: 1.06,
          letterSpacing: "-0.055em",
        }}
      >
        Personal
        <br />
        document
        <br />
        intelligence.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1310,
          top: 508,
          fontSize: 65,
          lineHeight: 1.06,
          letterSpacing: "-0.055em",
        }}
      >
        Right on
        <br />
        your phone.
      </div>
      <Phone
        style={{
          left: 790,
          top: 250,
          width: 340,
          height: 690,
          transform: `perspective(1800px) rotateY(${interpolate(frame, [0, 1.2 * fps], [-12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}deg)`,
        }}
      >
        <MediaLayer
          file={file}
          trimSeconds={trimSeconds}
          camera={camera}
          holdAfterSeconds={holdAfterSeconds}
        >
          <Library />
        </MediaLayer>
      </Phone>
      <div
        style={{
          position: "absolute",
          top: 987,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 22,
          color: "#74747c",
        }}
      >
        Your knowledge, within reach.
      </div>
    </Film>
  );
};
