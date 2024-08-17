import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function Header({ children, className }: HeaderProps) {
    return (
        <div className={cn("header", className)}>
            <Link href='/' className='md:flex-1'>
                <Image src='/assets/icons/docnow.png' alt='logi with name' width={120} height={32} className='hidden md:block' />
                <Image src='/assets/icons/docnowmob.png' alt='logi with name' width={42} height={42} className='mr-2 md:hidden' />
            </Link>
            {
                children
            }
        </div>
    )
}

export default Header