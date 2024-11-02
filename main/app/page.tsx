"use client";

import Navbar from "@/components/functions/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { HiBarsArrowDown } from "react-icons/hi2";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-b bg-[#0a1217] min-h-screen h-full flex justify-center items-center py-5">
      <div className="w-[90%] bg-[#e7e9de] rounded-2xl p-3 shadow-lg">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center text-center space-y-8 p-6">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold sm:text-6xl bg-gradient-to-r from-red-950 to-orange-800 text-transparent bg-clip-text font-rubikwetpaint">
            Unlock the Future of Memes!
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-yellow-800 font-semibold font-nostalgic">
            Mint your favorite memes and lock them in the Meme Time Capsule for
            a surprise reveal!
          </p>

          {/* Image and Action Area */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-8">
            {/* Image section */}
            <div className="h-[55vh] bg-[#f4bd63] w-[90%] md:w-1/2 rounded-2xl p-6 flex items-center justify-center shadow-lg">
              <Image
                src="/timecap.webp"
                alt="MemeCrypt Logo"
                width={600}
                height={500}
                objectFit="contain"
              />
            </div>

            {/* Action Area */}
            <div className="space-y-2 w-full md:w-1/2 flex flex-col items-center justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 font-rubikwetpaint">
                Preserve Your Meme Legacy!
              </h2>
              <p className="text-orange-950 text-lg">
                Mint, lock, and reveal your memes to the world in the future. Be
                part of meme history!
              </p>

              <Button
                asChild
                className="bg-cyan-950 text-white w-[40%] text-lg font-bold font-indie rounded-full"
              >
                <Link href="/mint">Mint Your Meme</Link>
              </Button>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 w-full">
            <Card className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold">Secure IPFS Storage</h3>
              <p className="text-gray-400">
                Your memes are stored securely on IPFS, ensuring they last
                forever.
              </p>
            </Card>
            <Card className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold">NFT Ownership</h3>
              <p className="text-gray-400">
                Own your memes as NFTs, with the ability to trade or sell them
                after reveal.
              </p>
            </Card>
            <Card className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold">Timed Capsule</h3>
              <p className="text-gray-400">
                Set a release date and let the countdown begin! Surprise the
                future with today’s humor.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
