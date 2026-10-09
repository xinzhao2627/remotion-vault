import type { ReactNode } from "react";
import { Video } from "@remotion/media";
import {
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type Camera = { zoom: number; x: number; y: number };
export type ClipProps = {
  file: string;
  trimSeconds: number;
  camera?: Camera;
  holdAfterSeconds?: number | null;
};

// A scene owns framing; this layer preserves replacement paths and source timing.
export const MediaLayer = ({
  file,
  trimSeconds,
  camera,
  holdAfterSeconds,
  children,
}: ClipProps & { children: ReactNode }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const hold =
    holdAfterSeconds == null ? undefined : Math.round(holdAfterSeconds * fps);
  const source = camera ?? { zoom: 1, x: 0.5, y: 0.5 };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {file ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            scale: source.zoom,
            transformOrigin: `${source.x * 100}% ${source.y * 100}%`,
          }}
        >
          <Sequence
            name="Recording frame hold"
            premountFor={fps}
            freeze={hold !== undefined && frame >= hold ? hold : undefined}
          >
            <Video
              name="Source recording"
              src={staticFile(file)}
              trimBefore={trimSeconds * fps}
              premountFor={fps}
              muted
              objectFit="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Sequence>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
