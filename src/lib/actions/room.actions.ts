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
          defaultAccesses:[]  
        });

        revalidatePath('/')

        return parseStringify(room)
    }catch(err){
        console.log('Error while creating a room', err)
    }
}