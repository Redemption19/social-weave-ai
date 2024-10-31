"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { BotMessageSquare, Menu, X } from "lucide-react";

// Change to named export
export function Navbar() {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add type for path parameter
  const isActive = (path: string): boolean => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BotMessageSquare className="w-8 h-8 text-blue-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                SocialWeave AI
              </span>
            </Link>
          </div>
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div
            className={`w-full sm:w-auto ${
              isMenuOpen ? "block" : "hidden"
            } sm:block mt-4 sm:mt-0`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
              {["Features", "Pricing", "Docs"].map((item) => {
                const path = `/${item.toLowerCase()}`;
                return (
                  <Link
                    key={item}
                    href={path}
                    className={`relative group py-2 sm:py-0 transition-colors ${
                      isActive(path)
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform transition-transform origin-left ${
                        isActive(path)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </Link>
                );
              })}
              {userId && (
                <Link
                  href="/generate"
                  className={`relative group py-2 sm:py-0 transition-colors ${
                    isActive('/generate')
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Dashboard
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform transition-transform origin-left ${
                      isActive('/generate')
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              )}
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <button className="bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 px-4 py-2 rounded transition-colors transition-transform transform hover:-translate-y-1">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-transform transform hover:-translate-y-1">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}