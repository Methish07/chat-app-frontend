import React, { useEffect, useRef, useState } from 'react'
import './chatcontainer.css'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { getAllMessagesRoute, sendMessageRoute } from '../APIroutes';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

const ChatContainer = ({ currentChat,currentUser,socket }) => {
    
    const scrollRef=useRef();
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const [messages,setmessages]=useState([]);

    useEffect(()=>{
        const fetchData=async()=>{
            if(currentChat){
                const response=await axios.post(getAllMessagesRoute,{
                    from:currentUser._id,
                    to:currentChat._id,
                });
                setmessages(response.data);
            }
        }
        fetchData();
    },[currentChat])

    const handleMsg=async (msg)=>{
        await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.error(err));
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        });

        const msgs=[...messages];
        msgs.push({fromSelf:true, message:msg});
        setmessages(msgs);

    }


    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setArrivalMessage({ fromSelf:false, message:msg});
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setmessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])

    return (
        <>
            {
                currentChat && (
                    <div className='container__main'>
                        <div className='container__user'>
                            <div className='container__avatar'>
                                <img src={currentChat.avatarImage} alt='user__avatar'></img>
                            </div>
                            <div className='container__username'>
                                <h3>{currentChat.username}</h3>
                            </div>
                            <Logout />
                        </div>
                        <Messages scrollRef={scrollRef} uuidv4={uuidv4} messages={messages}/>
                        <ChatInput handleMsg={handleMsg}/>
                        <div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer