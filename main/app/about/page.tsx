import Navbar from "@/components/functions/NavBar";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="bg-gradient-to-b bg-[#0a1217] min-h-screen h-full flex justify-center items-center py-5">
      <div className="w-[90%] h-full bg-[#e7e9de] rounded-2xl py-3 shadow-lg min-h-screen">
        <Navbar />
        <main className="p-6 text-gray-800 space-y-8">
          {/* Header Section */}
          <section className="text-center space-y-2 font-ebgaramond">
            <p className="text-xl max-w-3xl mx-auto text-emerald-950">
              "A place where your favorite memes are immortalized, locked, and
              loaded to be revealed in the future. MemeVault is not just a
              collection but a time capsule of iconic internet culture."
            </p>
          </section>

          {/* Mission Section */}
          <section className="space-y-4 font-rubikwetpaint">
            <h2 className="text-2xl font-semibold text-[#1a2c3f]">
              Our Mission
            </h2>
            <p>
              MemeVault aims to create a unique platform that allows users to
              mint their favorite memes as NFTs and lock them in a digital time
              capsule, set to be revealed at a future date. Our mission is to
              preserve internet culture, create a sense of anticipation, and let
              users experience a trip down memory lane as they rediscover
              classic memes.
            </p>
          </section>

          {/* Features Section */}
          <section className="space-y-4 font-spicy">
            <h2 className="text-2xl font-semibold text-[#1a2c3f]">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Time-Locked NFTs:</strong> Mint memes as NFTs and lock
                them in a digital time capsule, only to be revealed on a
                specified future date.
              </li>
              <li>
                <strong>IPFS Storage:</strong> Secure and decentralized storage
                for your memes, ensuring they remain accessible and
                tamper-proof.
              </li>
              <li>
                <strong>Community Vault:</strong> Explore and view publicly
                revealed memes that others have locked in their time capsules.
              </li>
              <li>
                <strong>Wallet Integration:</strong> Connect your wallet to
                easily mint, view, and manage your meme NFTs.
              </li>
              <li>
                <strong>Countdowns and Anticipation:</strong> Countdown timers
                for locked memes, creating excitement and anticipation for their
                reveal.
              </li>
            </ul>
          </section>

          {/* How It Works Section */}
          <section className="space-y-4 font-indie">
            <h2 className="text-2xl font-semibold text-[#1a2c3f]">
              How It Works
            </h2>
            <p>
              MemeVault is simple to use! Connect your wallet, upload your
              favorite meme, and mint it as an NFT. Select a lock duration, and
              let the countdown begin. Once the timer expires, your meme will be
              revealed for everyone to see, forever immortalized in the
              MemeVault.
            </p>
          </section>

          {/* Vision Section */}
          <section className="space-y-4 font-spicy">
            <h2 className="text-2xl font-semibold text-[#1a2c3f]">
              Our Vision
            </h2>
            <p>
              We envision MemeVault as the ultimate archive of internet
              culture—a place where timeless humor and iconic moments are
              preserved for future generations. In an age where memes are
              fleeting, we’re here to create a lasting digital legacy.
            </p>
          </section>

          {/* Call to Action Section */}
          <section className="text-center mt-8 font-indie">
            <h3 className="text-3xl font-bold text-[#1a2c3f]">
              Ready to Make Your Memes Immortal?
            </h3>
            <p className="text-lg text-gray-600 mt-2 mb-6">
              Join us on this journey and start locking your favorite memes
              today!
            </p>
            <Link
              href="/mint"
              className="inline-block bg-[#1a2c3f] text-white font-semibold py-3 px-6 font-nostalgic uppercase rounded-md hover:bg-[#3a4f66] transition duration-300"
            >
              Get Started
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
