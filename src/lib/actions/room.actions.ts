'use server'
import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblock';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';
export const createDocument = async({userId,email}:CreateDocumentParams)=>{
    const roomID = nanoid();

    try{

        const metadata = {
            creatorId : userId,
            email,
            title:'Untitled'
        }

        const usersAccesses : RoomAccesses ={
            [email]:['room:write']
        }
        const room = await liveblocks.createRoom(roomID, {
          metadata,
          usersAccesses,
          defaultAccesses:['room:write']  
        });

        revalidatePath('/')

        return parseStringify(room)
    }catch(err){
        console.log('Error while creating a room', err)
    }
}

export const getDocument = async ({roomId,userId}:{roomId:string,userId:string})=>{
    const room = await liveblocks.getRoom(roomId);
    const hasAccess = Object.keys(room.usersAccesses).includes(userId)
    if(!hasAccess){
        throw new Error('You do not have access to this document.')
    }
    return parseStringify(room)
}