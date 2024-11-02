"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, AlertTriangle } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import abi, { contractAddress } from "@/app/abi";
import Navbar from "@/components/functions/NavBar";
import "dotenv/config";
import Image from "next/image";

const GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

interface Meme {
  id: string;
  unlockTime: number;
  ipfsHash: string;
}

const Gallery = () => {
  return (
    <div className="bg-gradient-to-b bg-[#0a1217] min-h-screen h-full flex justify-center items-center py-5">
      <div className="w-[90%] h-full bg-[#e7e9de] rounded-2xl p-3 shadow-lg">
        <Navbar />
        <div className="flex flex-col items-center justify-center space-y-8 p-6">
          <h1 className="text-4xl font-extrabold sm:text-6xl bg-gradient-to-r from-red-950 to-orange-800 text-transparent bg-clip-text font-rubikwetpaint">
            Explore the Meme Time Capsule!
          </h1>
          <p className="text-lg sm:text-2xl text-yellow-800 font-semibold font-nostalgic">
            Discover the memes locked in the Meme Time Capsule and see when they
            will be revealed!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-8">
            <div className="h-[55vh] bg-[#f4bd63] w-[90%] md:w-1/2 rounded-2xl p-6 flex items-center justify-center shadow-lg">
              <Image
                src="/timecap.webp"
                alt="MemeCrypt Logo"
                width={600}
                height={500}
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <Card className="w-full max-w-md mx-auto border-4 border-slate-800 rounded-3xl font-indie mt-16 shadow-md bg-[#ee9256] space-y-3">
                <CardContent className="text-center font-bold text-xl uppercase">
                  <h2>Time Capsule Gallery</h2>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
