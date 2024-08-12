'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { Button } from './ui/button'

const LandingNavbar = () => {
    const { isSignedIn } = useAuth()
    return (
      <div className='text-white w-full p-4 flex items-center justify-between'>
         <Link href={isSignedIn?'/dashboard':'sign-in'}>
         <div className='w-fit flex items-center justify-center gap-x-2'>

         <Image className='bg-white rounded-full py-[2px]' width={50} height={50} src='/logo.png' alt='Logo'/>
         <h1 className='font-semibold text-xl'>Riddle</h1>
         </div>
         </Link>

         <Link href={isSignedIn?'/dashboard':'sign-in'}>
         <Button className='bg-white text-black font-semibold rounded-full' variant='outline'>Get Started</Button>
         </Link>

      </div>
    )
}

export default LandingNavbar