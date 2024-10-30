"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import {
    RainbowKitProvider,
    darkTheme,
    lightTheme,
    connectorsForWallets,
    midnightTheme,
} from "@rainbow-me/rainbowkit";
import {
    rainbowWallet,
    walletConnectWallet,
    coreWallet,
    ledgerWallet,
    metaMaskWallet,
    argentWallet,
    omniWallet,
    imTokenWallet,
    coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { useTheme } from "next-themes";

import { getConfig } from "./wagmi";

coinbaseWallet.preference = "smartWalletOnly";

const connectors = connectorsForWallets(
    [
        {
            groupName: "Popular",
            wallets: [
                rainbowWallet,
                walletConnectWallet,
                coreWallet,
                metaMaskWallet,
                coinbaseWallet,
            ],
        },
        {
            groupName: "Other",
            wallets: [ledgerWallet, argentWallet, omniWallet, imTokenWallet],
        },
    ],
    {
        appName: "My RainbowKit App",
        projectId: "YOUR_PROJECT_ID",
    }
);

export default function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const { theme } = useTheme();
    const [config] = useState(() => getConfig(connectors));
    const [queryClient] = useState(() => new QueryClient());

    const selectedTheme =
        theme === "dark"
            ? darkTheme({
                accentColor: "#7b3fe4",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
            })
            : theme === "light"
                ? lightTheme({
                    borderRadius: "small",
                    fontStack: "system",
                    overlayBlur: "small",
                })
                : midnightTheme({
                    borderRadius: "small",
                    fontStack: "system",
                    overlayBlur: "small",
                });

    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    initialChain={1320}
                    theme={selectedTheme}
                    coolMode
                    modalSize="wide"
                >
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
