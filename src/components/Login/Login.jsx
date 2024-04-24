import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../../fairbase/fairbase.init";
import { useState } from "react";
// import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const handelGoogleSingIn = () => {
        // console.log('mama is coming')
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser)
                console.log(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handelSingOut = () => {
        // console.log('ami ber hoyw gaci')
        signOut(auth)
            .then(result => {
                setUser(null)
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {user ?
                <button onClick={handelSingOut}>Sing out</button> :
                <button onClick={handelGoogleSingIn}>Google Login</button>}
            {user && <div>
                <h2>User: {user?.displayName}</h2>
                <h3>Email: {user?.email}</h3>
                <img src={user?.photoURL} alt="" />
            </div>}


        </div>
    );
};

export default Login;