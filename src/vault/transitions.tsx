import type { CSSProperties } from "react";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing } from "remotion";

type TransitionProps = {
  kind:
    | "document"
    | "push"
    | "passage"
    | "citation"
    | "interior"
    | "resolve"
    | "folder"
    | "page"
    | "focus";
};

const ObjectTransition = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}: TransitionPresentationComponentProps<TransitionProps>) => {
  const p = Easing.bezier(0.65, 0, 0.25, 1)(presentationProgress);
  const entering = presentationDirection === "entering";
  const style: CSSProperties = {};
  const kind = passedProps.kind;
  if (kind === "resolve") {
    if (entering) style.clipPath = `circle(${p * 1150}px at 50% 50%)`;
    else {
      style.scale = 1 - p * 0.5;
      style.opacity = 1 - p;
      style.transformOrigin = "50% 50%";
    }
  } else if (kind === "page") {
    if (entering) {
      style.clipPath = `inset(0 0 ${100 * (1 - p)}% 0)`;
      style.translate = `0px ${(1 - p) * 75}px`;
    } else {
      style.translate = `0px ${-p * 110}px`;
      style.opacity = 1 - p * 0.5;
    }
  } else if (kind === "focus") {
    if (entering)
      style.clipPath = `inset(${24 * (1 - p)}% ${28 * (1 - p)}% ${26 * (1 - p)}% ${40 * (1 - p)}% round ${20 * (1 - p)}px)`;
    else {
      style.scale = 1 + p * 0.08;
      style.opacity = 1 - p;
    }
  } else if (kind === "passage") {
    if (entering) {
      const horizontal = Math.min(1, p / 0.65);
      const vertical = Math.max(0, (p - 0.15) / 0.85);
      style.clipPath = `inset(${48 * (1 - vertical)}% ${100 * (1 - horizontal)}% ${45 * (1 - vertical)}% 0)`;
    } else {
      style.translate = `${-p * 120}px 0px`;
      style.opacity = 1 - p * 0.5;
    }
  } else {
    // Anchors align to authored object positions on the 1920 x 1080 stage.
    const box =
      kind === "citation"
        ? { x: 1160, y: 790, w: 450, h: 60 }
        : kind === "folder"
          ? { x: 128, y: 618, w: 260, h: 193 }
          : kind === "interior"
            ? { x: 790, y: 140, w: 340, h: 720 }
            : { x: 790, y: 250, w: 340, h: 690 };
    if (entering) {
      style.clipPath = `inset(${box.y * (1 - p)}px ${(1920 - box.x - box.w) * (1 - p)}px ${(1080 - box.y - box.h) * (1 - p)}px ${box.x * (1 - p)}px round ${36 * (1 - p)}px)`;
      if (kind === "push") {
        style.scale = 1.08 - p * 0.08;
        style.transformOrigin = "50% 55%";
      }
    } else if (kind === "push") {
      style.scale = 1 + p * 1.8;
      style.transformOrigin = "50% 55%";
      style.opacity = 1 - p;
    } else if (kind === "citation") {
      style.scale = 1 + p * 0.18;
      style.transformOrigin = "72% 76%";
      style.opacity = 1 - p;
    } else {
      style.opacity = 1 - p * 0.65;
    }
  }
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      {children}
    </AbsoluteFill>
  );
};

export const objectTransition = (
  kind: TransitionProps["kind"],
): TransitionPresentation<TransitionProps> => ({
  component: ObjectTransition,
  props: { kind },
});
