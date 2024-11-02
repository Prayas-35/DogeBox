"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "dotenv/config";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi, { contractAddress } from "../abi";
import Navbar from "@/components/functions/NavBar";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const contractABI = abi;
// console.log("JWT:", JWT);
async function pinFileToIPFS(file: any) {
  try {
    const data = new FormData();
    data.append("file", file);

    const request = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      }
    );
    const response = await request.json();
    // console.log("IPFS response:", response);
    return response;
  } catch (error) {
    console.log("Error uploading to IPFS:", error);
    return null;
  }
}

export default function LockYourMeme() {
  const [file, setFile] = useState<File | null>(null);
  const [unlockTime, setUnlockTime] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const account = useAccount();
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const ipfsResponse = await pinFileToIPFS(file);

    if (ipfsResponse) {
      const date = new Date(unlockTime);
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      console.log(unixTimestamp);
      console.log("File uploaded to IPFS:", ipfsResponse);

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "mintMeme",
        args: [account?.address, ipfsResponse.IpfsHash, unixTimestamp],
      });
      // Further logic
    } else {
      console.log("Failed to upload file to IPFS.");
    }

    setIsUploading(false);
  };

  return (
    <div className="bg-gradient-to-b bg-[#0a1217] min-h-screen h-screen flex justify-center items-center py-5">
      <div className="w-[90%] h-full bg-[#e7e9de] rounded-2xl py-3 shadow-lg">
        <Navbar />
        <Card className="w-full max-w-md mx-auto border-4 border-slate-800 rounded-3xl font-indie mt-16 shadow-md bg-[#ee9256] space-y-3">
          <CardHeader className="text-center font-bold text-xl uppercase">
            <CardTitle>Lock Your Meme!</CardTitle>
          </CardHeader>
          <CardContent className="font-dynapuff">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="file" className="font-semibold">
                  Select a file
                </Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="bg-[#e7e9de]"
                />
              </div>
              <div>
                <Label htmlFor="unlockTime" className="font-semibold">
                  Set unlock time
                </Label>
                <Input
                  id="unlockTime"
                  type="datetime-local"
                  value={unlockTime}
                  onChange={(e) => setUnlockTime(e.target.value)}
                  required
                />
              </div>
              <button
                className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
                type="submit"
                disabled={isUploading || isPending || isConfirming}
              >
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20">
                  {isUploading || isPending || isConfirming
                    ? "Uploading..."
                    : "Upload File"}
                </span>
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
