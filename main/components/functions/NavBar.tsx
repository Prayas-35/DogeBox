"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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

  const account = useAccount();

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center gap-x-10 py-3 mx-2">
        <div className="flex flex-row items-center px-3 py-2">
          <Button asChild>
            <Link href="/">
              <Image
                src="/dogefav.png"
                alt="MemeVault Logo"
                width={50}
                height={60}
              />
              <span className="font-extrabold text-black text-3xl dark:text-white font-nostalgic">
                DogeBox
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <HiX className="text-xl text-white" />
            ) : (
              <HiBarsArrowDown className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:gap-6 absolute md:static top-14 left-0 right-0 bg-white md:bg-transparent z-40 md:z-auto p-4 md:p-0 shadow-md md:shadow-none`}
        >
          <NavLink href="/">Home</NavLink>
          {account.address && <NavLink href="/collection">My NFTs</NavLink>}
          <NavLink href="/gallery">Explore</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>
        <div className="py-2 mr-8">
          <ConnectButton
            label="Connect Wallet"
            accountStatus="avatar"
            chainStatus="none"
          />
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-primary font-spicy text-lg px-3 py-2 rounded-md font-bold font-fredoka transition-colors duration-200 text-center hover:underline hover:bg-primary/10 text-background-900"
    >
      {children}
    </Link>
  );
}
