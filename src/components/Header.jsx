import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
    const [pageState,setPageState]=useState("sign-in")

    
    
    const location=useLocation()
    const navigate=useNavigate()
    const auth=getAuth()
    const pathMatchroute=(route)=>{
        if(route===location.pathname){
            return true
        }
        
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setPageState("profile")
            }else{
                setPageState("sign-in")
            }
        })

    },[auth])
  return (
    <div className='bg-white border-b shadow-sm sticky z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="" className='h-5 cursor-pointer' onClick={()=>navigate("/")}/>
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchroute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchroute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchroute("/sign-in") || pathMatchroute("/profile"))  && "text-black border-b-red-500"}`} onClick={()=>navigate("/profile")}>{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
