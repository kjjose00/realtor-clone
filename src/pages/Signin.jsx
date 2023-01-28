import React, { useState } from 'react';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

export const Signin = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })
    const [showPassword,setShowPassword]=useState(false)
    const {email,password}=formData;
    const navigate=useNavigate()
    const onchange=(e)=>{
        
        setFormData((prev)=>({
            ...prev,
            [e.target.id]:e.target.value,

        }));
    }

    async function onsubmit(e){
        e.preventDefault();
        try {
            const auth=getAuth()
            const userCredential=await signInWithEmailAndPassword(auth,email,password)
            if(userCredential.user){
                navigate("/")
            }
            
        } catch (error) {
            toast.error("bad user credentials")
            
        }

    }
  return (
    <section>
        <h1 className='text-3xl font-bold text-center mt-6'>Sign In</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

        <div className='lg:w-[50%] md:w-[67%] mb-12 md:mb-6'>
            <img src="https://media.istockphoto.com/id/507400394/photo/golden-key-and-puzzle.jpg?s=612x612&w=is&k=20&c=0Dv2U9nF6PaXviWIUbPzmxfh-bcS4PQgFZjT4J-HpZY=" alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
            <form onSubmit={onsubmit}>
                <input type="email" name="" id="email" className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6' value={email} onChange={onchange} placeholder='Email Address'/>
               <div className='relative mb-6'>
                <input type={showPassword ? "text" : "password"} name="" id="password" value={password} onChange={onchange} placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out'/>
                {showPassword ? (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>):(<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>)}
               </div>
               <div className='flex justify-between whitespace-nowrap text-sm mb-6'>
                <p>Don't have an Account?
                    <Link to='/sign-up' className='text-red-600 font-semibold hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
                </p>
                <p>
                    <Link to='/forgot-password' className='text-blue-600 font-semibold hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
                </p>
               </div>
            <button type="submit" className='w-full bg-blue-600 text-white py-3 font-medium uppercase text-sm rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign In</button>
            <div className='my-4 flex items-center justify-between'>
                <hr className='w-[49%] border-gray-300'/>
                <p className='mx-1 font-semibold'>OR</p>
                <hr className='w-[49%] border-gray-300' />
            </div>
            <OAuth/>
            </form>
        </div>
        </div>
    </section>
  )
}
