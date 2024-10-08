import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()
  const {setUser, user} = useContext(UserContext)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/login', { email, password });
      console.log(data);
      alert('Login successful');
      setUser(data);
      nav('/account');
    } catch {
      alert('Login fail');

    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='bm-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder='your@email.com'
            value={email}
            onChange={e => { setEmail(e.target.value) }} />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={e => { setPassword(e.target.value) }} />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link className='underline text-black' to={'/register'}>Register Now</Link></div>
        </form>
      </div>

    </div>
  )
}
