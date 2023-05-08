import React, {useState, useEffect} from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(true);
    let auth = getAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){  
                setUid(user.uid);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }, [auth])

    const handleSignUp = async (event) => {
        if(!loading){
            signOut(auth).then(() => {
                navigate("/signin")
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    if(!loading && uid){
        return (
        <div className="account-signout">
            <button className="btn-out-red" type='button' onClick={handleSignUp}>
                Sign Out
            </button>
        </div>)
        
    } 
};

export default SignOutButton;