import React from "react";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Intro for not authorized users
 */
export const Intro = () => {
  return (
    <div className="p-5">
      <p>Intro</p>

      <RainbowKitCustomConnectButton />
    </div>
  );
};
