"use client";
import React, { ReactNode } from 'react'

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from '@/components/local/Loader';

function Provider({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>

            <ClientSideSuspense fallback={<Loader />}>
                {children}
            </ClientSideSuspense>

        </LiveblocksProvider>
    )
}

export default Provider