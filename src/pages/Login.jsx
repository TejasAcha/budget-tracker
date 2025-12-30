import React, { useState } from 'react'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState('')

  const handleMail = (e) => {
    setEmail(e.target.value)
    
    
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
   
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('')
    
    if(email === '') {
      setError("Email required");
      return 
    }
    if(password === ''){
      setError("Password required");
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      console.log({ email, password });
      setIsLoading(false)
    }, 1000);

    
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className='w-full max-w-sm p-6 rounded-xl shadow-lg bg-gray-100 flex flex-col space-y-10'>
        <h2 className="flex text-blue-500 items-center justify-center space-x-2">BudgetFlow</h2>
        <p className="text-m flex text-gray-700 items-center justify-center space-x-2">Login to your account</p>
        <form onSubmit={handleLogin}>
          <label className="flex flex-col gap-1">  
            <span className="font-medium text-gray-700 text-left">Email</span>
            <input className='border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300' name="Email" onChange={handleMail} value={email}/>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium text-gray-700 text-left" >Password</span>
            <input className='border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300' name="Password" onChange={handlePassword} type='password' value={password}/>
          </label>
          <div className="flex items-center justify-between"> 
            <label className="flex items-center space-x-2 cursor-pointer">
            <input 
            className='border rounded-lg h-4 w-4 text-blue-600 focus:ring-blue-500' 
            type="checkbox"
            />
            <span className="text-sm text-gray-700">Remember me</span>
            </label>

            <a href="/forget-password" className='text-sm text-blue-600 hover:underline'> forget password</a>
          </div>
        

        <button className='bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700' disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        </form>
        
        { error &&
          <p className="text-sm flex text-red-700 items-center space-x-2">{error}</p>
        }
        <p className="text-sm flex text-gray-700 items-center space-x-2">Don't have an account? <a href="/" className='text-sm text-blue-600 hover:underline'>  Sign Up </a></p>

      </div>
    </div>
  )
}

export default Login
