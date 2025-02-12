import { toast } from 'react-toastify';
import { createContext, useEffect, useState } from "react";

// import axios from "axios";
import { PropTypes } from 'prop-types';
import auth from "../firebase/firebase.cofig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { axiosSecure } from "../hooks/AxiosSecure/useAxiosSecure";

export const ContextAll = createContext(null)

const ContextApi = ({ children }) => {
    const [render , setRender] = useState(false)
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
    const updateProfiles = (name) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            displayName: name,
        }).then(() => {
            setUser(auth.currentUser);
            setLoading(true);
        }).catch(() => {
            toast.error('not changes')
        });
    }
    const updateProfilesPhoto = (photo) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            photoURL: photo
        }).then(() => {
            setUser(auth.currentUser);
            setLoading(true);
        }).catch(() => {
            toast.error('not changes')
        });
    }

    const provider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(false)
        return signInWithPopup(auth, provider)
    }

    const UserLogout = async () => {
        setLoading(false)
        await axiosSecure(`${import.meta.env.VITE_SERVER_URL}/jwt-logout`, {
            withCredentials: true,
        })
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(true)
            setRender(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])


    const value = { user, loading,setUser ,render , updateProfilesPhoto ,updateProfiles , setRender  , setLoading , UserCreate, UserLogin, UserUpdate, googleLogin , UserLogout }
    return (
        <ContextAll.Provider value={value}>{children}</ContextAll.Provider>
    );
};

export default ContextApi;

ContextApi.prototype = {
    children:PropTypes.object.isRequired
}