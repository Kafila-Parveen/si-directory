import { auth, signIn, signOut} from '@/auth'
import { Home, BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async() => {
    const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
    <nav  className="flex items-center justify-between">
        <Link  href="/">
         <Image src= "/Logo.png" alt="logo" width={80} height={40} />
        </Link>

        <div  className="flex items-center gap-5 text-black">
            {session && session?.user ? (
            <>

            <Link href="/" aria-label="Home" className="flex items-center gap-1 hover:text-blue-950 transition-colors">
              <Home className="size-6 inline sm:hidden" />
              <span className="hidden sm:inline">Home</span>
            </Link>
             <Link href="/startup/create">
              <span className='max-sm:hidden'>Create</span>
              <BadgePlus className='size-6 sm:hidden text-red-500' />
             </Link>

             <form action={async () => {
                'use server';
                await signOut({redirectTo: '/'})
              }}> 
               <button type='submit'>
               <span className='max-sm:hidden'>Logout</span>
               <LogOut className='size-6 sm:hidden text-red-500' />
               </button>
             </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage 
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
            ) : (
              
                <form action={async () => {
                   'use server';
                   await signIn('github')}}> 
                  <button type='submit'>Login</button>
                </form>  
            )}
        
        </div>
    </nav>
    </header>
  );
};

export default Navbar;
