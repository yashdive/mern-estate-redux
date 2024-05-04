import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {

  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col'>
        <img src={currentUser.avatar} 
        className=' rounded-full h-24 w-24 self-center mt-2 object-cover cursor-pointer' />
        <input type='text' placeholder='username' id='username'
          className='  shadow-md rounded-lg p-3 mt-2'
        />
        <input type='text' placeholder='email' id='email'
          className='shadow-md  rounded-lg p-3 mt-2'
        />
        <input type='text' placeholder='password' id='password'
          className='shadow-md  rounded-lg p-3 mt-2'
        />
        <button className=' bg-slate-700 text-white p-3 rounded-lg mt-2 uppercase hover:opacity-90 disabled:opacity-95'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='  text-red-700 cursor-pointer outline rounded-lg p-2'>Delete Account</span>
        <span className=' text-red-700 cursor-pointer outline rounded-lg p-2'>Sign out</span>

      </div>
    </div>
  )
}
