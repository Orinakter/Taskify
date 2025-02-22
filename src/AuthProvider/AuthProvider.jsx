import React from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.init";
import axios from "axios";

export const authorizedContext = createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const registerUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)

    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const userProfileUpdate = (name,path)=>{
        const userData = {
            displayName:name,
            photoURL: path
        }
        return updateProfile (auth.currentUser,userData)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    const provider = new GoogleAuthProvider();
    const googleLoginBtn =()=>{
       
       setLoading(true)
        return signInWithPopup(auth,provider)
        
    }

    const authInfo = {
        registerUser,
        loginUser,
        user,
        userProfileUpdate,
        logOut,
        loading,
        googleLoginBtn

        




    }
    return (
        <authorizedContext.Provider value={authInfo}>{children}</authorizedContext.Provider>
    );
};

export default AuthProvider;
