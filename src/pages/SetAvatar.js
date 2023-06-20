import React, { useEffect, useState } from 'react'
import './register.css'
import axios from 'axios'
import { Buffer } from 'buffer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setAvatarRoute } from '../APIroutes'
import { useNavigate } from 'react-router-dom'
import './setAvatar.css'
const SetAvatar = () => {

    const hairColors = ['Black', 'Brown', 'Blonde', 'Red'];
    const facialHairOptions = ['Blank', 'BeardLight', 'BeardMedium', 'MoustacheFancy'];
    const accessoryOptions = ['Blank', 'Prescription01', 'Prescription02', 'Sunglasses'];
    const clothesOptions = ['BlazerShirt', 'GraphicShirt', 'BlazerSweater', 'Hoodie'];
    const topOptions = ['ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairFlat', 'LongHairBigHair', 'LongHairCurly', 'Hat', 'NoHair'];


    const [hairColor, setHairColor] = useState('');
    const [facialHair, setFacialHair] = useState('');
    const [accessory, setAccessory] = useState('');
    const [clothes, setClothes] = useState('');
    const [top, setTop] = useState('');
    const [avatars, setAvatars] = useState('');
    const [show, setshow] = useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate('/login');
        }
    })
    const handleHairColorChange = (event) => {
        setHairColor(event.target.value);
    };

    const handleFacialHairChange = (event) => {
        setFacialHair(event.target.value);
    };

    const handleAccessoryChange = (event) => {
        setAccessory(event.target.value);
    };

    const handleClothesChange = (event) => {
        setClothes(event.target.value);
    };

    const handleTopChange = (event) => {
        setTop(event.target.value);
    };

    const toastOptions = {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    }
    const setvisible = () => {
        setshow(true);

    };
    const selectAvatar= async ()=>{
        await setAvatars(`https://avataaars.io/?avatarStyle=Circle&topType=${top}&
    accessoriesType=${accessory}&facialHairType=${facialHair}&facialHairColor=${hairColor}
    &clotheType=${clothes}&clotheColor=Blue02&
    graphicType=Deer&eyeType=Happy&eyebrowType=RaisedExcitedNatural&
    mouthType=Default&skinColor=Pale`);
    console.log(avatars);
    setProfilePicture();
    
}

const setProfilePicture=async()=>{
    if(avatars===undefined||avatars===''){
        toast.error("please create an avatar",toastOptions);
    }
    else{
        const user=await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,
        {
            image:avatars,
        });

        if(data.isSet){
            user.isAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            setTimeout(() => {
                navigate('/login');
              }, 1000);
        }
        else{
            toast.error("error setting in avatar please try again",toastOptions);
        }
    }
  }

    return (
        <div className='generator__div'>
            {
                !show && 
                    <div className='main__content'>
                        <h2>Avatar Generator</h2>

                        <div className='inner__content'>
                        <span>
                            Hair Color:
                            </span>
                            <select value={hairColor} onChange={handleHairColorChange}>
                                <option value="">-- Select Hair Color --</option>
                                {hairColors.map((color, index) => (
                                    <option key={index} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            </div>

                        <div className='inner__content'>
                        <span>
                            Facial Hair:
                            </span>
                            <select value={facialHair} onChange={handleFacialHairChange}>
                                <option value="">-- Select Facial Hair --</option>
                                {facialHairOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            </div>


                        <div className='inner__content'>
                        <span>
                            Accessory:
                            </span>
                            <select value={accessory} onChange={handleAccessoryChange}>
                                <option value="">-- Select Accessory --</option>
                                {accessoryOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            </div>


                       <div className='inner__content'>
                       <span>
                            Clothes:
                            </span>
                            <select value={clothes} onChange={handleClothesChange}>
                                <option value="">-- Select Clothes --</option>
                                {clothesOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className='inner__content'>
                        <span>
                            Top:
                            </span>
                            <select value={top} onChange={handleTopChange}>
                                <option value="">-- Select Top --</option>
                                {topOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            </div>
                        <button className='create__btn' onClick={setvisible}>create</button>
                    </div>
            }
            {
                        show && <div className='selected__div'>
                            <img
                                src={`https://avataaars.io/?avatarStyle=Circle&topType=${top}&
    accessoriesType=${accessory}&facialHairType=${facialHair}&facialHairColor=${hairColor}
    &clotheType=${clothes}&clotheColor=Blue02&
    graphicType=Deer&eyeType=Happy&eyebrowType=RaisedExcitedNatural&
    mouthType=Default&skinColor=Pale`} />
    <button className='create__btn' onClick={selectAvatar}>Confirm</button>
                        </div>
                    }
                    <ToastContainer/>

                </div>
    )
}
            export default SetAvatar