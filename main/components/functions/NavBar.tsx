"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { LuMenuSquare } from "react-icons/lu";
import { HiBarsArrowDown } from "react-icons/hi2";
import { ModeToggle } from "../theme/theme-switcher";

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
      <div className="flex justify-between items-center gap-x-10 py-3">
        <div className="flex flex-row items-center px-3 py-2">
          <Link href="/">
            {/* <Image
                src="/logo1-removebg-preview.png"
                alt="MemeVault Logo"
                width={40}
                height={50}
              /> */}
            <span className="font-extrabold text-black text-2xl dark:text-white pl-1 font-spicy uppercase">
              MemeCrypt
            </span>
          </Link>
        </div>
        <div className="flex md:hidden">
          <button aria-label="Toggle menu">
            <HiBarsArrowDown className="text-xl text-white" />
          </button>
        </div>
        <div className="hidden md:flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/gallery">Explore</NavLink>
          {account.address && <NavLink href="/collection">My NFTs</NavLink>}
          <NavLink href="/about">About</NavLink>
        </div>
        <div className="py-2 px-2">
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
      className="hover:text-primary px-3 py-2 rounded-md text-sm md:text-base font-bold font-fredoka transition-colors duration-200 text-center hover:underline hover:bg-primary/10 text-background-900"
    >
      {children}
    </Link>
  );
}
