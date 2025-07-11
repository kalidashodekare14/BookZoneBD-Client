import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.config";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const registerSystem = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginSystem = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
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
    }, [])



    const userInfo = {
        registerSystem,
        loginSystem,
        setLoading,
        loading
    }

    return (
        <authContext.Provider value={userInfo}>{children}</authContext.Provider>
    )

};

export default AuthProvider;