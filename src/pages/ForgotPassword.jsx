import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OAuth } from '../components/OAuth';

export const ForgotPassword = () => {
    
    const [email,setEmail]=useState("")

    const onchange=(e)=>{
        setEmail(e.target.value)
        
    }

    async function onsubmit(e){
        e.preventDefault();
        try {
            const auth=getAuth();
            await sendPasswordResetEmail(auth,email)
            toast.success("Email was sent");
            
        } catch (error) {
            toast.error("couldn't send reset password");
        }
    }
  return (
    <section>
        <h1 className='text-3xl font-bold text-center mt-6'>Forgot Password</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

        <div className='lg:w-[50%] md:w-[67%] mb-12 md:mb-6'>
            <img src="https://media.istockphoto.com/id/1141354693/photo/string-on-persons-finger.jpg?s=612x612&w=0&k=20&c=-zJiJ37W9Meutm8a3xjRJfoPK1lyAJE61AnfG8U-00k=" alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
            <form onSubmit={onsubmit}>
                <input type="email" name="" id="email" className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6' value={email} onChange={onchange} placeholder='Email Address'/>
              
               <div className='flex justify-between whitespace-nowrap text-sm mb-6'>
                <p>Don't have an Account?
                    <Link to='/sign-up' className='text-red-600 font-semibold hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
                </p>
                <p>
                    <Link to='/sign-in' className='text-blue-600 font-semibold hover:text-blue-700 transition duration-200 ease-in-out'>Sign In Instead</Link>
                </p>
               </div>
            <button type="submit" className='w-full bg-blue-600 text-white py-3 font-medium uppercase text-sm rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Send Reset Password</button>
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
