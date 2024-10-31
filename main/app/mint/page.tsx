'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import "dotenv/config";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import abi, { address } from '../abi'

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const contractAddress = address;
const contractABI = abi;
// console.log("JWT:", JWT);
async function pinFileToIPFS(file: any) {
    try {
        const data = new FormData();
        data.append("file", file);

        const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });
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
    const { data: hash, writeContractAsync, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

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
            })
            // Further logic 
        } else {
            console.log("Failed to upload file to IPFS.");
        }

        setIsUploading(false);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Lock Your Meme!</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="file">Select a file</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="unlockTime">Set unlock time</Label>
                        <Input
                            id="unlockTime"
                            type="datetime-local"
                            value={unlockTime}
                            onChange={(e) => setUnlockTime(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isUploading || isPending || isConfirming}>
                        {isUploading || isPending || isConfirming? 'Uploading...' : 'Upload File'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}