import React,{useEffect, useRef, useState} from 'react'
import './chat.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {allUserRoute, host} from '../APIroutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'
const Chat = () => {

  const socket=useRef()

  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();


  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);

    }
  },[currentUser])


  useEffect(()=>{
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoading(true);
      }
    };
  
    checkUser();
  },[])

  useEffect(()=>{
    const fetchData=async()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data=await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
          console.log(currentUser+"is currentuser");
          console.log(contacts+"is contacts");
        }
        else{
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  },[currentUser])

  const handleChat=(chat)=>{
    setCurrentChat(chat);
  }
  return (
    <div className='container'>
      <div className='content'>
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChat}></Contacts>
     {
      isLoading && currentChat===undefined ? 
      ( <Welcome currentUser={currentUser} />)
      : ( <ChatContainer  socket={socket} currentChat={currentChat} currentUser={currentUser}></ChatContainer>)
     }
      </div>
    </div>
  )
}

export default Chat