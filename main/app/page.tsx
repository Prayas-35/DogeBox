"use client";

import React from "react";
import Navbar from "@/components/functions/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Future of Memes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Meme Time Capsule
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Mint Your Meme Legacy Today!
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upload, lock, and let the world unveil your meme a year from
                    now!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Futuristic Time Capsule"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  height="600"
                  src="/placeholder.svg?height=600&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Preserve Your Humor for the Future
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              The Meme Time Capsule is a unique, blockchain-powered experience
              where you can mint your favorite memes as NFTs, lock them for a
              set period, and reveal them later. Once the time capsule opens,
              the memes will be forever enshrined on the blockchain.
            </p>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Lock Your Memes</h3>
                  <p className="text-muted-foreground">
                    Securely store your meme NFTs for future release
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Decentralized Storage</h3>
                  <p className="text-muted-foreground">
                    Permanently stored on IPFS, making your memes immortal
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">Countdown to Reveal</h3>
                  <p className="text-muted-foreground">
                    A live countdown until your memes are unveiled to the world
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Recently Unlocked Memes
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Image
                      alt={`Unlocked Meme ${i}`}
                      className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                      height="300"
                      src={`/placeholder.svg?height=300&width=300&text=Meme+${i}`}
                      width="300"
                    />
                  </CardContent>
                </Card>
              ))} */}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg">Mint Your Meme</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 MemeVault. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

{
  /* <BackgroundGradientAnimation>
      <Navbar />
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Memes X Nostalgia
        </p>
      </div>
    </BackgroundGradientAnimation> */
}
