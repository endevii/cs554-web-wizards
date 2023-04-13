import React, {useState} from 'react';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../App.css'
import SocialSignIn from './SocialSignIn';

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setEmail("");
                setPassword("");
                navigate("/account")
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='login-container'>
            <form className='form' onSubmit={handleSignIn}>
                <div className='form-body'>
                    <h2>Sign In</h2>
                    <div className='form-group'>
                        <label>
                            Email: 
                            <input
                            className='form-control'
                            required
                            name='email'
                            type='email'
                            placeholder='Email'
                            onChange={event => setEmail(event.target.value)}
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
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                            />
                        </label>
                    </div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <br />
            <SocialSignIn />
        </div>
    );
};