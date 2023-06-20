import React, { useEffect, useState } from 'react'
import './register.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { registerRoute } from '../APIroutes'
import { useNavigate } from 'react-router-dom'
const Register = () => {

  const navigate = useNavigate();
  const [fullname, setfullname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [confirmpass, setconfirmpass] = useState('');

  const handleSubmit = async () => {
    const userdetails = {
      username: fullname,
      email,
      password,
      confirm_password: confirmpass
    };
    if (handleMisMatched()) {
     var flag=false;
      const {data}=await axios.post(registerRoute,userdetails);
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status===true){
        toast.success("sign in success",toastOptions);
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        flag=true;
      }
      if(flag===true){
        navigate('/setAvatar');
      }
    }
  }

  const handlename = (e) => {
    setfullname(e.target.value);
  }

  const handlemail = (e) => {
    setemail(e.target.value);
  }

  const handlepass = (e) => {
    setpassword(e.target.value);
  }

  const handleconfirm = (e) => {
    setconfirmpass(e.target.value);
  }

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  }


  const handleMisMatched = () => {
    if (password != confirmpass) {
      toast.error("password and confirm password must be same!", toastOptions);
      return false;
    }
    else if (fullname < 3) {
      toast.error("username should be greater than 3 characters!", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("password must be greater than 8 characters!", toastOptions);
      return false;
    }
    return true;
  }


  return (
    <div className='register'>
      <div className='main__content'>
        <span className='register__title'>Sign up</span>
        <input type='text' placeholder='enter fullname' id='fullname' onChange={handlename} required></input>
        <input type='email' placeholder='enter email' id='email' onChange={handlemail} required></input>
        <input type='password' placeholder='enter password' id='password' onChange={handlepass} required></input>
        <input type='password' placeholder='confirm password' id='confirm_password' required onChange={handleconfirm}></input>
        <button className='register__btn' onClick={handleSubmit}>sign up</button>
        <div><ToastContainer></ToastContainer></div>
        <span>already have an account? <a href='/login'>sign in</a></span>
      </div>
    </div>
  )
}

export default Register