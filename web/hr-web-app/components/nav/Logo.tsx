"use client"

import React from 'react'
import Image from 'next/image'
import { useParamsStore } from '@/hooks/useParamsStore'
import Link from 'next/link'

const Logo = () => {

    return (
        <Link href={'/'} className='cursor-pointer' >
            <Image
                src="/assests/logo.png"
                alt="image"
                width={150}
                height={150}
                priority={true} />
        </Link>
    )
}

export default Logo