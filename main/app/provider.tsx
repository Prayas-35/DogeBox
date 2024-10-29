"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

import { getConfig } from "./wagmi";

// coinbaseWallet.preference = "smartWalletOnly";

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: "Popular",
//       wallets: [
//         rainbowWallet,
//         walletConnectWallet,
//         coreWallet,
//         metaMaskWallet,
//         coinbaseWallet,
//       ],
//     },
//     {
//       groupName: "Other",
//       wallets: [ledgerWallet, argentWallet, omniWallet, imTokenWallet],
//     },
//   ],
//   {
//     appName: "My RainbowKit App",
//     projectId: "YOUR_PROJECT_ID",
//   }
// );

export default function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  //const [config] = useState(() => getConfig(connectors));
  const [queryClient] = useState(() => new QueryClient());

  return (
    //<WagmiProvider config={config} initialState={props.initialState}>
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
    //</WagmiProvider>
  );
}
