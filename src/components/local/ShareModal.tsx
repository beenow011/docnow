'use client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import UserTypeSelector from './UserTypeSelector';

const ShareModal = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
    const user = useUser()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState<UserType>('viewer')

    const shareDocumentHandler = async () => {
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className='gradient-blue flex h-9 gap-1 px-4' disabled={currentUserType !== 'editor'}>
                    <Image src="/assets/icons/share.svg" alt="Share" width={20} height={20} className='min-w-4 md:size-5' />
                    <p className='mr-1 hidden sm:block'>Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='shad-dialog'>
                <DialogHeader>
                    <DialogTitle>Manage who can view this project</DialogTitle>
                    <DialogDescription>
                        Select the people you want to share this project with.
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor='email' className='mt-6 text-blue-100'>
                    Email address
                </Label>
                <div className='flex items-center gap-3'>
                    <div className="flex flex-1 rounded-md bg-dark-400">
                        <Input
                            type='email'
                            id='email'
                            placeholder='Enter email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='share-input'
                        />
                        <UserTypeSelector userType={userType} setUserType={setUserType} />

                    </div>
                    <Button type='submit' onClick={shareDocumentHandler} className='gradient-blue flex h-full gap-1 px-5'>
                        {loading ? 'Sharing...' : 'Invite'}

                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShareModal