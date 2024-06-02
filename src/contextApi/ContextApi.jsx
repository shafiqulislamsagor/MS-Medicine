
import { createContext, useEffect, useState } from "react";

// import axios from "axios";
import { PropTypes } from 'prop-types';
import auth from "../firebase/firebase.cofig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { axiosSecure } from "../hooks/AxiosSecure/useAxiosSecure";

export const ContextAll = createContext(null)

const ContextApi = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)


    const UserCreate = async (email, password) => {
        setLoading(false)
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const UserLogin = async (email, password) => {
        setLoading(false)
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const UserUpdate = async (name, photo) => {
        setLoading(false)
        return await updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const provider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(false)
        return signInWithPopup(auth, provider)
    }

    const UserLogout = async () => {
        setLoading(false)
        await axiosSecure(`${import.meta.env.VITE_API_URL}/jwt-logout`, {
            withCredentials: true,
        })
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(true)
        })
        return () => {
            unSubscribe()
        }
    }, [])


    const value = { user, loading,setUser , setLoading , UserCreate, UserLogin, UserUpdate, googleLogin , UserLogout }
    return (
        <ContextAll.Provider value={value}>{children}</ContextAll.Provider>
    );
};

export default ContextApi;

ContextApi.prototype = {
    children:PropTypes.object.isRequired
}