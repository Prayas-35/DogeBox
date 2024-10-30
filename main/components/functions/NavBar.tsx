"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { LuMenuSquare } from "react-icons/lu";
import { HiBarsArrowDown } from "react-icons/hi2";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full px-6 py-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          {/* <Link href="/">
            <Image src="/logo1.png" alt="Nebula Logo" width={40} height={50} />
          </Link> */}
          <span className="font-fredoka font-extrabold">MemeVault</span>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <HiBarsArrowDown className="text-xl" />
            )}
          </button>
        </div>

        {/* Navigation Links (hidden on small screens) */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row justify-evenly items-center gap-4 ml-0 md:ml-24 absolute top-full mt-4 md:mt-0 md:top-auto left-0 w-full md:w-auto bg-background md:bg-transparent md:static p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300`}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/mint">Mint Meme</NavLink>
          {isConnected && (
            <NavLink href="/collections">My NFTs</NavLink>
          )}
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Connect Button and ModeToggle (Always Visible) */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* <ModeToggle /> */}
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
      className="text-text hover:text-primary px-3 py-2 rounded-md text-sm md:text-base font-bold font-fredoka transition-colors duration-200 text-center"
    >
      {children}
    </Link>
  );
}
