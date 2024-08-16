"use client";
import React, { ReactNode } from 'react'

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from '@/components/local/Loader';
import { getClerkUsers } from '@/lib/actions/user.actions';

function Provider({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider authEndpoint='/api/liveblocks-auth' resolveUsers={async ({ userIds }) => {
            const users = await getClerkUsers({ userIds })
            return users
        }}>
            {/* resolveMentionSuggestions={async ({ text, roomId }) => {
                const roomUsers = await getClerkUsers({ roomId })

            }} */}

            <ClientSideSuspense fallback={<Loader />}>
                {children}
            </ClientSideSuspense>

        </LiveblocksProvider>
    )
}

export default Provider