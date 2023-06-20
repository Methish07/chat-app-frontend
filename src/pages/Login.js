import React, { useEffect, useState } from 'react'
import './register.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginRoute } from '../APIroutes'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate();
  const [fullname, setfullname] = useState('');
  const [password, setpassword] = useState('');


  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[])

  const handleSubmit = async () => {
    const userdetails = {
      username: fullname,
      password,
    };
    if (handleMisMatched()) {
      const {data}=await axios.post(loginRoute,userdetails);
      console.log(data)
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status===true){
        toast.success("sign in success",toastOptions);
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
      }
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  }

  const handlename = (e) => {
    setfullname(e.target.value);
  }

  const handlepass = (e) => {
    setpassword(e.target.value);
  }

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  }


  const handleMisMatched = () => {
    if (fullname=="") {
      toast.error("username must be a valid username!", toastOptions);
      return false;
    }
    else if (password=="") {
      toast.error("password must be a valid password", toastOptions);
      return false;
    }
    return true;
  }


  

  return (
    <div className='register'>
      <div className='main__content'>
        <span className='register__title'>Sign in</span>
        <input type='text' placeholder='enter username' id='fullname' onChange={handlename} required></input>
        <input type='password' placeholder='enter password' id='password' onChange={handlepass} required></input>
        <button className='register__btn' onClick={handleSubmit}>login</button>
        <div><ToastContainer></ToastContainer></div>
        <span>don't have an account? <a href='/register'>sign up</a></span>
      </div>
    </div>
  )
}

export default Login