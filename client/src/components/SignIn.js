import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        document.getElementById('error-message').innerHTML = '';
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/too-many-requests') {
          document.getElementById('error-message').innerHTML =
            'You have been temporarily locked out of your account. Try again later';
        } else {
          let err = document.getElementById('error-message');
          err.innerHTML = 'Incorrect Email or Password';
        }
        console.log(error.code);
      });
  };

  return (
    <div className='login-container'>
      <form className='form' onSubmit={handleSignIn}>
        <div className='form-body'>
          <h2>Sign In</h2>
          <h5 id='error-message' style={{ color: 'red' }}></h5>
          <div className='form-group'>
            <label>
              Email:
              <input
                className='form-control'
                required
                name='email'
                type='email'
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </label>
          </div>
          <div className='form-group'>
            <label>
              Password:
              <input
                className='form-control'
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                autoComplete='off'
                required
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </label>
          </div>
          <button type='submit'>Sign In</button>
        </div>
      </form>
      <br />
      <p>
        Don't have an account? Sign up <Link to='/signup'>here</Link>
      </p>
    </div>
  );
}
