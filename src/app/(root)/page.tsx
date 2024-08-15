import AddDocsBtn from '@/components/local/AddDocsBtn'
import Header from '@/components/local/Header'
import { Button } from '@/components/ui/button'
import { getDocuments } from '@/lib/actions/room.actions'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/sign-in')
  const roomDocs = await getDocuments(clerkUser.emailAddresses[0].emailAddress)
  return (
    <main className="home-container">
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {
        roomDocs.length > 0 ? (
          <div className='document-list-container'>
            <div className='document-list-title'>
              <h3 className="text-28-semibold">
                All Documents
              </h3>
              <AddDocsBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress} />
            </div>
          </div>
        ) : (
          <div className='document-list-empty'>
            <Image src='/assets/icons/doc.svg'
              alt='empty'
              width={40}
              height={40}
              className='mx-auto'
            />

            <AddDocsBtn userId={clerkUser.id} email={clerkUser.emailAddresses[0].emailAddress} />
          </div>
        )
      }
    </main>
  )
}

export default page