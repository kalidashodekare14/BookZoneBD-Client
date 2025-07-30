import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();


    const registerSystem = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginSystem = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleAuthSystem = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    const logoutSystem = () => {
        return signOut(auth)
    }


    const passwordResetSystem = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
            setLoading(false)

        })
        return () => {
            unSubscribe()
        }
    }, [user])



    const userInfo = {
        user,
        registerSystem,
        loginSystem,
        setLoading,
        loading,
        googleAuthSystem,
        passwordResetSystem,
        logoutSystem
    }

    return (
        <authContext.Provider value={userInfo}>{children}</authContext.Provider>
    )

};

export default AuthProvider;