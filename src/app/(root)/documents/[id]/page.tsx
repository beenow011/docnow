import { Editor } from '@/components/editor/Editor'
import Header from '@/components/local/Header'
import Room from '@/components/local/Room'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

function Documents
    () {
    return (
        <div>
            <Room />

        </div>
    )
}

export default Documents
