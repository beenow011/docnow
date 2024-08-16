'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import React, { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/local/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Loader from './Loader';
import ActiveMem from './ActiveMem';
import { Input } from '../ui/input';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';
const Room = ({ roomId, roomMetadata, users, currentUserType }: CollaborativeRoomProps) => {
    // const currentUserType = 'editor'
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [documentTitle, setdocumentTitle] = useState(roomMetadata.title)
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const updateTitleHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setLoading(true)
            try {
                if (documentTitle !== roomMetadata.title) {
                    const updatedDocument = await updateDocument(roomId, documentTitle)

                    if (updatedDocument) {
                        setEditing(false)
                    }
                }
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setEditing(false);
                updateDocument(roomId, documentTitle);

            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [roomId, documentTitle])

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div
                            ref={containerRef}
                            className="flex w-fit items-center justify-center gap-2"
                        >
                            {editing && !loading ? (
                                <Input
                                    type="text"
                                    value={documentTitle}
                                    ref={inputRef}
                                    placeholder="Enter title"
                                    onChange={(e) => setdocumentTitle(e.target.value)}
                                    onKeyDown={updateTitleHandler}
                                    disabled={!editing}
                                    className='document-title-input'
                                />
                            ) : (
                                <>
                                    <p className="document-title">{documentTitle}</p>
                                </>
                            )}
                            {
                                currentUserType === 'editor' && !editing && (
                                    <Image src='/assets/icons/edit.svg' alt='edit' width={24} height={24} onClick={() => setEditing(true)} className='pointer' />
                                )
                            }
                            {
                                currentUserType !== 'editor' && !editing && (
                                    <p className='view-only-tag'>View only</p>
                                )
                            }

                            {
                                loading && <p className='text-sm text-gray-400'>Saving... </p>
                            }
                        </div>
                        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                            <ActiveMem />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType} />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    );
}

export default Room