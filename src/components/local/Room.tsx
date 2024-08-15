'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import React, { ReactNode } from 'react'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/local/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Loader from './Loader';
import ActiveMem from './ActiveMem';
const Room = () => {
    return (
        <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div className="flex w-fit items-center justify-center gap-2">
                            <p className="document-title">Share</p>
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveMem />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default Room