import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center mt-3 my-7'>
        SignUp
      </h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border rounded-lg p-3' />
        <input type='text' placeholder='Email' className='border rounded-lg p-3' />
        <input type='text' placeholder='Password' className='border rounded-lg p-3' />
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80 font-medium '>Sign Up</button>
      </form> 
      <div className='flex gap-2 mt-5'> 
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
            <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
