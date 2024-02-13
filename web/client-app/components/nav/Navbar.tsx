
'use client'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
// import LoginButton from './LoginButton'

const Navbar = () => {

  // const { data: session } = useSession();


  return (
    <header
      className='
        text-2xl
        sticky
        z-50 top-0 
        flex items-center justify-between gap-5
        px-5
        bg-sky-900 
        text-slate-200
        shadow-md
        bg-opacity-90
        backdrop-blur-md'
    >
      <Logo />
      <div>
        <Link href={`/`}>الشركات</Link>
      </div>

        <div>
          <button onClick={() => signIn()}>الدخول</button>
        </div>
  
     
    </header>
  )
}

export default Navbar
