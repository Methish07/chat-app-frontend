import React from 'react'
import robot from '../pages/robot.gif'
import './welcome.css'
const Welcome = ({currentUser}) => {
  return (
    <div className='welcome'>
        <img src={robot}></img>
        <h1> Welcome <span>{ currentUser ?currentUser.username:"loading......"}</span></h1>
        <h3>please select a Chat to Start Messaging</h3>
    </div>
  )
}

export default Welcome