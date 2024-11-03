"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, AlertTriangle } from "lucide-react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi, { contractAddress } from "@/app/abi";
import Navbar from "@/components/functions/NavBar";
import "dotenv/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDownload } from "react-icons/md";

const GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

interface Meme {
  id: string;
  unlockTime: number;
  ipfsHash: string;
  creator: string;
}

const Gallery = () => {
  const account = useAccount();
  const address = account?.address;

  const {
    data: collection,
    refetch,
  }: { data: Meme[] | undefined; refetch: any } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getUnlockedMemes",
    args: [],
  });

  // const { data: hash, writeContractAsync } = useWriteContract();

  async function downloadFileFromPinata(
    cid: string,
    creator: string,
    amount: number
  ) {
    // if (address === creator) {
    //   alert("You are the owner of this meme.");
    //   return;
    // }
    // const tx = await writeContractAsync(
    //   {
    //     address: contractAddress,
    //     abi,
    //     functionName: "payOwner",
    //     args: [creator]
    //   },
    //   {
    //     onSuccess(data) {
    //       console.log("Transaction successful!", data);
    //     },
    //     onSettled(data, error) {
    //       if (error) {
    //         console.error("Error on settlement:", error);
    //       } else {
    //         console.log("Transaction settled:", data);
    //       }
    //     },
    //     onError(error) {
    //       console.error("Transaction error:", error);
    //     },
    //   }
    // );

    const url = `https://${GATEWAY}/ipfs/${cid}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dogebox_meme";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (!collection) return;
    const interval = setInterval(() => {
      refetch()
        .then((result: any) => {
          console.log("Data refetched: ", result);
        })
        .catch((error: any) => {
          console.error("Error during refetch: ", error);
        });
    }, 5000);
    return () => {
      console.log("Clearing refetch interval");
      clearInterval(interval);
    };
  }, [collection, refetch]);

  console.log("Collection: ", collection);

  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="bg-gradient-to-b bg-[#0a1217] min-h-screen h-full flex justify-center items-center py-5">
      <div className="w-[90%] h-full bg-[#e7e9de] rounded-2xl py-3 shadow-lg">
        <Navbar />
        {collection ? (
          collection.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10 mx-10 justify-between gap-y-8 mb-4">
              {collection.map((meme) => (
                <Card
                  key={meme.id}
                  className="w-full max-w-sm h-[400px] overflow-hidden flex flex-col  shadow-lg  rounded-3xl"
                >
                  <CardContent className="p-0 flex-grow space-y-4">
                    <div className="relative h-[250px]">
                      <img
                        src={`https://${GATEWAY}/ipfs/${meme.ipfsHash}`}
                        alt={meme.id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center align-baseline bottom-0 gap-y-4">
                      <span
                        className={`font-bold font-rubikwetpaint text-center mt-2 ${
                          isRevealed
                            ? "text-gray-900 text-sm"
                            : "text-cyan-800 text-base"
                        }`}
                        onClick={handleReveal}
                        style={{
                          cursor: "pointer",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {isRevealed
                          ? `Owner: ${meme.creator}`
                          : "Tap to reveal owner"}
                      </span>
                      <Button
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-[50%] text-lg font-bold font-indie"
                        onClick={() => {
                          address
                            ? downloadFileFromPinata(
                                meme.ipfsHash,
                                meme.creator,
                                20
                              )
                            : alert(
                                "Please connect your wallet to download the meme."
                              );
                        }}
                      >
                        {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> */}
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl uppercase">
                          Download
                          <MdDownload className="w-6 h-6 ml-2" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <AlertTriangle className="w-16 h-16 text-yellow-500" />
              <p className="text-xl font-bold ml-4">No memes found</p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
