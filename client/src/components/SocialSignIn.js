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
        <img
            onClick={() => socialSignOn('google')}
            alt='google signin'
            className='img'
            src='https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1'
        />
        </div>
  );
};

export default SocialSignIn;