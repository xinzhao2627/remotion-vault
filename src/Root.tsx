import { MyComposition } from "./Composition";
import { VaultPitchCompositions } from "./vault/VaultPitch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <VaultPitchCompositions />
      <MyComposition />
    </>
  );
};
