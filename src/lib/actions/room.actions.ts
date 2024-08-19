'use server'
import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblock';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { use } from 'react';
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

export const getDocument = async ({roomId,userId}:{roomId:string,userId:string})=>{
    try{
    const room = await liveblocks.getRoom(roomId);
    const hasAccess = Object.keys(room.usersAccesses).includes(userId)
    if(!hasAccess){
        throw new Error('You do not have access to this document.')
    }
    return parseStringify(room)
}catch(err){
    console.log('Error while getting a room',err)
}

}
export const getDocuments = async (email:string)=>{
    try{
    const rooms = await liveblocks.getRooms({userId:email});
 
    return parseStringify(rooms)
}catch(err){
    console.log('Error while getting a rooms',err)
}

}

export const updateDocument = async(roomId:string,title:string)=>{
    try{
        const updatedRoom = await liveblocks.updateRoom(roomId,{
            metadata:{
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom)
    }catch(err){
        console.log('error while updating',err)
    }
}

export const updateDocumentAccess = async({roomId,email,userType}:ShareDocumentParams)=>{
    try{
      const usersAccesses : RoomAccesses ={
            [email]:getAccessType(userType) as AccessType,
      }

      const room = await liveblocks.updateRoom(roomId,{
            usersAccesses
        })

        if(room){

        }
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(room)
    }catch(err){
        console.log('error while updating',err)
    }
}   

export const removeCollaborator = async({roomId,email}:{roomId:string,email:string})=>{
    try{
        const room = await liveblocks.getRoom(roomId)
        if(room.metadata.email === email){
            throw new Error('You cannot remove the owner of the document.')
        }

        const updatedRoom = await liveblocks.updateRoom(roomId,{
            usersAccesses:{
                [email]:null
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom)
    }catch(err){
        console.log('error while removing',err)
    }
}