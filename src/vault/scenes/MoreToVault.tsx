import { useCurrentFrame, useVideoConfig } from "remotion";
import { Film, progress } from "../components/Film";

export const MoreToVault = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Film dark>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 112,
            fontWeight: 600,
            letterSpacing: "-0.06em",
            opacity: progress(frame, 0, 0.45 * fps),
            translate: `0px ${(1 - progress(frame, 0, 0.7 * fps)) * 18}px`,
          }}
        >
          There's more to Vault.
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#b5a2e3",
            marginTop: 42,
            letterSpacing: "-0.025em",
            opacity: progress(frame, 0.5 * fps, 0.95 * fps),
          }}
        >
          More ways to make it yours.
        </div>
      </div>
    </Film>
  );
};
