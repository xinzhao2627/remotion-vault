import type { ReactNode } from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { MediaLayer, type Camera } from "./MediaLayer";

export type FeatureClip = {
  file: string;
  trimSeconds: number;
  camera: Camera;
  holdAfterSeconds: number | null;
};

export const FeatureMedia = ({
  clip,
  children,
}: {
  clip: FeatureClip;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hold =
    clip.holdAfterSeconds === null
      ? undefined
      : Math.round(clip.holdAfterSeconds * fps);
  return (
    <Sequence
      name="Recording playback"
      premountFor={fps}
      freeze={hold !== undefined && frame >= hold ? hold : undefined}
    >
      <MediaLayer
        file={clip.file}
        trimSeconds={clip.trimSeconds}
        camera={clip.camera}
      >
        {children}
      </MediaLayer>
    </Sequence>
  );
};
