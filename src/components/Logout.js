import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate('/login')
          }, 1000);
        }
    return (
        <div className='logout'>
            <BiPowerOff onClick={handleClick}/>
        </div>
    )
}
export default Logout