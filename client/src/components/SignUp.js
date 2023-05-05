import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase.js';
import SocialSignIn from "./SocialSignIn.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
    const [matchPassword, setMatchPassword] = useState('');
    const [message, setMessage] = useState("");
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const {
            displayName, 
            email, 
            passwordOne, 
            passwordTwo
        } = event.target.elements;

        if(passwordOne.value !== passwordTwo.value) {
            setMatchPassword('Passwords fo not match!');
            return false;
        }

        try {
            await createUserWithEmailAndPassword(auth, email.value, passwordOne.value, displayName)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: displayName.value
                }).then (async () => {
                    const { data } = await axios.get("http://localhost:3001/adduser/" + userCredential.user.uid);
                    console.log(data)
                    navigate("/account")
                })
            }).catch((error) => {
                console.log(error);
            });
        } catch (e) {
            alert(e);
        }
    };
    
    return (
        <div>
            <h1>Sign Up</h1>
            {message && <p>{message}</p>}
            {message && <Link to='/login'>Login</Link>}
            {matchPassword && <h4>{matchPassword}</h4>}
            <br/>
            <br/>
            <form onSubmit={handleSignUp}>
                <div className='form-group'>
                    <label> Full name:
                        <input
                            className='form-control'
                            required
                            name="displayName"
                            type="text"
                            id="displayName"
                            onChange={event => setFullName(event.target.value)}
                            value={fullName}
                        />
                    </label>
                </div>
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
                        id='passwordOne'
                        name='passwordOne'
                        type='password'
                        placeholder='Password'
                        autoComplete='off'
                        required
                        onChange={event => setPasswordOne(event.target.value)}
                        value={passwordOne}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Confirm Password: 
                        <input
                        className='form-control'
                        name='passwordTwo'
                        type='password'
                        placeholder='Confirm Password'
                        autoComplete='off'
                        required
                        onChange={event => setPasswordTwo(event.target.value)}
                        value={passwordTwo}
                        />
                    </label>
                </div>
                <button>Sign Up</button>
            </form>
            <br />
            <SocialSignIn />
        </div>
    )
};

export default SignUp;