"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs'

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth()
  
  if (!isLoaded) return null
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image 
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt='Zoom logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Zoom</p>
      </Link>

      <div className='flex justify-between gap-5'>
        {/* Clerk - User Management */}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <button className='text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors'>
              Sign In
            </button>
          </SignInButton>
        )}

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar