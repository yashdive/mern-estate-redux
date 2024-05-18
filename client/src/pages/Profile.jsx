import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase';
import {getStorage,  getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserfailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
export default function Profile() {

  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  console.log(error)
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  },[file]);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError]  = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress))
    },
    (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
      setFormData({...formData,avatar: downloadURL})
      )
    }
    )
  }
  const handleChange = ( e ) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          
        },
        body: JSON.stringify(formData)
      }
      )

      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);


      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/deleteUser/${currentUser._id}`,
      {
        method:'DELETE',

      })

      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserfailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserfailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input onChange={(e)=> setFile(event.target.files[0])} type='file'  ref={fileRef} accept='image/*' hidden/>
        <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()} 
        className=' rounded-full h-24 w-24 self-center mt-2 object-cover cursor-pointer' />
        <p className=' self-center text-sm my-2'>
          {fileUploadError ? 
            (<span className=' text-red-700'>
              Error image upload (image must be less than 2MB)
            </span> 
            ):filePerc > 0 && filePerc < 100 ? (
              <span className=' text-slate-700'>
                {`Uploading ${filePerc}%`}
              </span>
              )  : 
              filePerc === 100 ? (
                <span className=' text-green-700'>
                  Image Uploaded successfully!
                </span>
                )  : (
                    ''
                )
           }
        </p>
        <input type='text' placeholder='username' id='username' defaultValue={currentUser.username}
          className='  shadow-md rounded-lg p-3 mt-2' onChange={handleChange}
        />
        <input type='text' placeholder='email' id='email' defaultValue={currentUser.email}
          className='shadow-md  rounded-lg p-3 mt-2'
        />
        <input type='password' placeholder='password' id='password' 
          className='shadow-md  rounded-lg p-3 mt-2'
        />
        <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg mt-2 uppercase hover:opacity-90 disabled:opacity-95'>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='  text-red-700 cursor-pointer outline rounded-lg p-2' onClick={handleDeleteUser}>Delete Account</span>
        <span className=' text-red-700 cursor-pointer outline rounded-lg p-2'>Sign out</span>

      </div>
      <p className=' text-red-700 my-4'>
        {error ? error : ''}
      </p>
      <p className=' text-green-700'>
        {updateSuccess ? 'User updated successfully!' : ''}
      </p>

    </div>
  )
}
