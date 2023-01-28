import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';


export const OAuth = () => {

  const navigate=useNavigate()
  
  async function onGoogleClick(e){
    e.preventDefault();
    try {
      const auth=getAuth();
      const provider = new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      const user=result.user;
      console.log(user)
      
      // check for the user

      const docRef=doc(db,"users",user.uid)
      const docSnap=await getDoc(docRef);

      if(!docSnap.exists()){
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp(),
        })
      }
      navigate("/")
    } catch (error) {
      toast.error("couldn't authorize with Google");
    }

  }
  return (
    <button type='button' className='uppercase flex items-center w-full bg-red-700 justify-center text-white py-3 text-sm rounded font-medium hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg' onClick={onGoogleClick}>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
        </button>
  )
}
