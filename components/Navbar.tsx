'use client'

import Link from "next/link"
import {
    SignInButton,
    SignUpButton,
    UserButton,
    SignedOut,
    SignedIn,
    useAuth,
  } from "@clerk/nextjs";
import { useEffect, useState } from "react";

  export function Navbar() {
    const {userId} = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled,  setIsScrolled] = useState(false)

    useEffect (() =>{
        const handleScroll = () => {   
            setIsScrolled(window.scrollY > 10)
        };
    });

    return <div></div>
  }

 
 