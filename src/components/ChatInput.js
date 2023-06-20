import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import './chatinput.css'
const ChatInput = ({handleMsg}) => {
  const [showEmojiPicker,setShowEmojiPicker]=useState(false);
  const [msg,setMsg]=useState("");

  const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0){
      handleMsg(msg);
      setMsg('');
    }
  }

  const handleShowEmojiPicker=()=>{
    setShowEmojiPicker(!showEmojiPicker)
  }
  const handleEmojiClick=(event,emoji)=>{
    let message=msg;
    message+=event.emoji;
    console.log(message)
    setMsg(message)
  }
  return (
    <div className='chatinput__container'>
    <div className='button__container'>
        <div className='emoji'>
            <BsEmojiSmileFill className={showEmojiPicker?'emoji__icon':""} onClick={handleShowEmojiPicker}/>
            {
              showEmojiPicker && <Picker defaultSkinTone='neutral' theme='dark' suggestedEmojisMode='recent' height={300} width={300} onEmojiClick={handleEmojiClick}/>
            }
        </div>
    </div>
    <form className='input__container' onSubmit={(e)=>sendChat(e)}>
        <input className='chat__input' type='text' placeholder='type your message here' 
            value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
        <button className='submit'><IoMdSend/></button>
    </form>
    </div>
  )
}

export default ChatInput