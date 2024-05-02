import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"


export default function Signup() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            setLoading(true);
            const res = await fetch('/api/auth/signup',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        if(data.success === false){
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        setError(null);
        console.log(data);
        navigate('/sign-in')

        }catch(error){
            setLoading(false);
            setError(error.message);
        }
        
    }
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center mt-3 my-7'>
        SignUp
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} placeholder='Username' id="username" className='border rounded-lg p-3 shadow-md' />
        <input type='text' onChange={handleChange} placeholder='Email' id="email" className='border rounded-lg p-3 shadow-md' />
        <input type='text' onChange={handleChange} placeholder='Password' id="password" className='border rounded-lg p-3 shadow-md' />
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80 font-medium shadow-md'>{loading ? 'Loading...' : 'Sign up'}</button>
        <OAuth/>
      </form> 
      <div className='flex gap-2 mt-5'> 
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
            <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      <div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}
