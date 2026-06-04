"use client"
// import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from '@/constants';
import {usePathname} from 'next/navigation';
import { cn } from '@/lib/utils';

const SideBar = ({user}: SiderbarProps) => {
    const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
            <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="SJ Banking Logo"
                className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">SJ Banking</h1>
        </Link>

        {sidebarLinks.map((item) =>{
            // Here  we will check if the tab is active or not
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
            return (
                <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', {
                        'bg-bank-gradient': isActive
                    })}
                >
                    <div className="relative sixe-6">
                        <Image src={item.imgURL} alt={item.label} width={24} height={24}
                        className={cn({'brightness-[3] invert-0': isActive})}
                        ></Image>
                    </div>  

                    <p className={cn('sidebar-label', {
                        '!text-white': isActive
                    })}>
                        {item.label}
                    </p>
                </Link>
                
            )
        })}
      </nav>
    </section>
  )
}

export default SideBar
