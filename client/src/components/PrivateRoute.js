import {Navigate, Outlet} from 'react-router-dom';
import React , {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PrivateRoute = () => {
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(true);
    let auth = getAuth();

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

    if(!loading){
        if(uid !== null){
            return  <Outlet/>
        } else if(!loading){
            return <Navigate to='/signin' />
        }
    }
};

export default PrivateRoute;
