"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, AlertTriangle } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import abi, { contractAddress } from "@/app/abi";
import Navbar from "@/components/functions/NavBar";
import "dotenv/config";

const GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

interface Meme {
  id: string;
  unlockTime: number;
  ipfsHash: string;
}

const Collection = () => {
  const [timeLeftMap, setTimeLeftMap] = useState<{ [key: string]: string }>({});
  const account = useAccount();
  const address = account?.address;

  const { data: collection }: { data: Meme[] | undefined } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getOwnedMemes",
    args: [address],
  });

  useEffect(() => {
    if (!collection) return;

    const calculateTimeLeft = () => {
      const newTimeLeftMap: { [key: string]: string } = {};

      collection.forEach((meme) => {
        const unixTimestamp = Number(meme.unlockTime);
        const unlockDate = new Date(unixTimestamp * 1000);
        const now = new Date();
        const difference = unlockDate.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          newTimeLeftMap[
            meme.id
          ] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeftMap[meme.id] = "Unlocked";
        }
      });

      setTimeLeftMap(newTimeLeftMap);
    };

    // Calculate the time left initially
    calculateTimeLeft();

    // Update the time left every second
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [collection]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        {collection ? (
          collection.length > 0 ? (
            <div className="flex flex-wrap gap-4 ml-10">
              {collection.map((meme) => (
                <Card
                  key={meme.id}
                  className="w-full max-w-sm h-[400px] overflow-hidden flex flex-col"
                >
                  <CardContent className="p-0 flex-grow">
                    <div className="relative h-[250px]">
                      <img
                        src={`https://${GATEWAY}/ipfs/${meme.ipfsHash}`}
                        alt={meme.id}
                        className="w-full h-full object-cover"
                      />
                      {timeLeftMap[meme.id] !== "Unlocked" && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Lock className="text-white w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h2 className="text-xl font-bold mb-2">
                        Time Left Until Unlock
                      </h2>
                      <p className="text-3xl font-mono" aria-live="polite">
                        {timeLeftMap[meme.id]}
                      </p>
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

export default Collection;
