import { Editor } from '@/components/editor/Editor'
import Header from '@/components/local/Header'
import Room from '@/components/local/Room'
import { getDocument } from '@/lib/actions/room.actions'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function Documents
    ({ params: { id } }: SearchParamProps) {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect('/sign-in')

    const room = await getDocument({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress
    })
    if (!room) redirect('/')

    return (
        <main className='flex w-full flex-col items-center'>


            <Room roomId={id} roomMetadata={room.metadata} />


        </main>
    )
}

export default Documents
