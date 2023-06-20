import React from 'react'

const Messages = ({messages,scrollRef,uuidv4}) => {
  return (
    <div className='chat__messages'>
      {
        messages.map((msg)=>{
          return(
            <div ref={scrollRef} key={uuidv4}>
              <div className={`message ${msg.fromSelf ? "sended ":"received"}`}>
              <div className='chat__content'>
              <p>{msg.message}</p>
              </div>
              </div>
              </div>
          )
        })
      }
    </div>
  )
}

export default Messages