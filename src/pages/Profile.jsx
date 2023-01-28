import React, { useEffect, useState } from 'react';
import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { FcHome } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { ListingItem } from '../components/ListingItem';


export const Profile = () => {
  const auth=getAuth()
  const navigate=useNavigate()
  const [changeDetail,setChangeDetail]=useState(false)
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const {name,email}=formData
  function onLogout(){
    auth.signOut();
    navigate("/")
  }

  function onchange(e){
    setFormData((prev)=>({
      ...prev,
      [e.target.id]:e.target.value,
    }))
  }

  async function onsubmit(){
    try {
      if(auth.currentUser.displayName!==name){
        // update display name in firebase
        await updateProfile(auth.currentUser,{
          displayName:name,
        })
        // update the name in firestore
        const docRef=doc(db,"users",auth.currentUser.uid);
        await updateDoc(docRef,{
          name,
          })

      }
      toast.success("profile details updated")
      
    } catch (error) {
      toast.error("couldn't update the profile details")
    }

  }

  useEffect(()=>{
    async function fetchUserListings(){
      setLoading(true)
      const listingRef=collection(db,"listings");
      const q=query(listingRef,where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"));
      const querySnap=await getDocs(q);
      let listings=[];
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data(),
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchUserListings();

  },[auth.currentUser.uid])

  async function onDelete(listingId){
    if(window.confirm("Are you sure you want to delete?")){
      await deleteDoc(doc(db,"listings",listingId))
      const updatedlistings=listings.filter((listing)=>listing.id!==listingId)
      setListings(updatedlistings)
      toast.success("successfully deleted the listing")
    }
  }

  function onEdit(listingId){
   navigate(`/edit-listing/${listingId}`) 
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex items-center justify-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold mb-6'>My Profile</h1>
      <div className='w-full lg:w-1/2 md:w-[50%] mt-6 px-3 mx-auto'>
        <form>
          <input type="text" id='name' value={name} disabled={!changeDetail} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`} onChange={onchange}/>

          <input type="email" id='email' value={email} disabled className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='flex items-center mb-6'>Do you want to change your name?
              <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer font-semibold' onClick={()=>{
                changeDetail && onsubmit();
                setChangeDetail(!changeDetail);}}>{changeDetail?"Apply Change":"Edit"}</span>
            </p>
            <p className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer font-semibold' onClick={onLogout}>Sign out</p>
          </div>
        </form>
        <button type="submit" className='w-full text-white uppercase text-sm px-7 py-3 bg-blue-600 font-medium shadow-md rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
          <Link to="/create-listing" className='flex justify-center items-center'>
                <FcHome className='bg-red-200 text-3xl mr-2 rounded-full p-1 border-2'/>
          Sell or Rent Your Home
          </Link>
        </button>
      </div>
                </section>
      <div className='max-w-6xl px-3 mt-6 mx-auto'>

        {!loading && listings.length>0 && (
          <>
            <h2 className='text-center text-2xl font-semibold'>My Listings</h2>
            <ul className='sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
              {listings.map((listing)=>(
                <ListingItem key={listing.id} id={listing.id} listing={listing.data}
                onDelete={()=>onDelete(listing.id)}
                onEdit={()=>onEdit(listing.id)}/>
              ))}
            </ul>
          </>
        )}
          </div>
    </>
  )
}
