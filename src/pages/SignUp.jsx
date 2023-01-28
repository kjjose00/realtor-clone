import React,{ useState } from 'react';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
})
const [showPassword,setShowPassword]=useState(false)
const {name,email,password}=formData;
const navigate=useNavigate();
const onchange=(e)=>{
    
    setFormData((prev)=>({
        ...prev,
        [e.target.id]:e.target.value,

    }));
}

async function onsubmit(e){
    e.preventDefault();
   if(email==="" || password===""){

       if(email===""){
           toast.warning("Email can't be blank")
       }
       if(password===""){
           toast.warning("Password can't be blank")
       }
   }
   else{
    try {
        const auth = getAuth();
        const userCredential=await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser,{
            displayName:name,
        })
        const user=userCredential.user
        const formDataCopy={...formData}
        delete formDataCopy.password
        formDataCopy.timestamp=serverTimestamp();

        await setDoc(doc(db,"users",user.uid),formDataCopy)

        navigate("/")
        // toast.success("Sign Up was successfull")
        
    } catch (error) {
        toast.error("something went wrong with registration")
        
    }
}
}
  return (
    <section>
        <h1 className='text-3xl font-bold text-center mt-6'>Sign Up</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

        <div className='lg:w-[50%] md:w-[67%] mb-12 md:mb-6'>
            <img src="https://images.unsplash.com/photo-1556740767-414a9c4860c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlZ2lzdGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="key" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
            <form onSubmit={onsubmit}>
                <input type="text" name="" id="name" className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6' value={name} onChange={onchange} placeholder='Full Name'/>
                <input type="email" name="" id="email" className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6' value={email} onChange={onchange} placeholder='Email Address'/>
               <div className='relative mb-6'>
                <input type={showPassword ? "text" : "password"} name="" id="password" value={password} onChange={onchange} placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out'/>
                {showPassword ? (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>):(<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>)}
               </div>
               <div className='flex justify-between whitespace-nowrap text-sm mb-6'>
                <p>Have an Account?
                    <Link to='/sign-in' className='text-red-600 font-semibold hover:text-red-700 transition duration-200 ease-in-out ml-1'>Sign In</Link>
                </p>
                <p>
                    <Link to='/forgot-password' className='text-blue-600 font-semibold hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
                </p>
               </div>
            <button type="submit" className='w-full bg-blue-600 text-white py-3 font-medium uppercase text-sm rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign Up</button>
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
