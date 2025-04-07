'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon } from 'lucide-react'

import { NavBody, NavItems, ResizableNavbar } from '../ui/resizable-navbar'
import cn from '@/lib/utils'

const Navbar = () => {
  // const userId = "demo"; // 临时代替，避免报错

  const navItems = [
    { name: 'Products', link: '#' },
  ]

  return (
    <ResizableNavbar className="fixed top-0">
      <NavBody
        className="bg-black/40 backdrop-blur-lg border-b-[1px] border-neutral-900 py-4 px-4 z-[100] dark:bg-neutral-950/80"
      >
        {/* Left Side - Logo */}
        <aside className="flex items-center gap-[2px]">
          <p className="text-3xl font-bold">测试</p >
          <Image
            src="/fuzzielogo.png"
            width={15}
            height={15}
            alt="DELL logo"
            className="shadow-sm"
          />
        </aside>
      </NavBody>
    </ResizableNavbar>
  )
}

export default Navbar