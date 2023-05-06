import React from 'react';
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const SocialSignIn = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const socialSignOn = async (provider) => {
        if(provider === 'google'){
            let google = new GoogleAuthProvider();
            signInWithPopup(auth, google)
            .then((result) => {
                navigate("/account");
            })
        }
    }
    return (
        <div>
            <h2>Sign in using google</h2>
        <img
            onClick={() => socialSignOn('google')}
            alt='google signin'
            className='img'
            src='https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png'
        />
        </div>
  );
};

export default SocialSignIn;