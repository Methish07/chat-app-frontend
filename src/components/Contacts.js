import React, { useEffect, useState } from 'react'
import './contacts.css'
const Contacts = ({contacts,currentUser,changeChat}) => {
  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);

  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  },[currentUser])

  const handleSelect=(idx,contact)=>{
    console.log(idx);
    setCurrentSelected(idx);
    changeChat(contact)
  }
  return (
    <>
    {
      currentUserImage && currentUserName &&
      <div className='contacts__content'>
        <div className='contacts'>
        {
            contacts.map((contact,idx)=>{
              return(
                <div onClick={()=>handleSelect(idx,contact)} className={`${currentSelected===idx?"selected":"contact"}`}>
                  <img className='contact__img' src={contact.avatarImage}></img>
                  <span className='contact__username'>{contact.username}</span>
                  </div>
              )
            })
          }
        </div>
        <div className='current__user'>
          <img className='current__image' src={currentUserImage}></img>
          <span className='current__username'>{currentUserName}</span>
        </div>
      </div>
    }
    </>
  )
}

export default Contacts