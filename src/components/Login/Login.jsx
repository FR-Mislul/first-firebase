import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../../fairbase/fairbase.init";
import { useState } from "react";
// import { GithubAuthProvider } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider =new GithubAuthProvider()
    const handelGoogleSingIn = () => {
        // console.log('mama is coming')
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser)
                console.log(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handelGithubSingIn = () => {
        // console.log('ami github sing in')
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInUser = result.user;
                setUser(loggedInUser)
                console.log(loggedInUser)
        })
        .catch(error => {
            console.log(error)
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
                <div>
                    <button onClick={handelGoogleSingIn}>Google Login</button>
                    <button onClick={handelGithubSingIn}>Github SingIn</button>
                </div>}
            {user && <div>
                <h2>User: {user?.displayName}</h2>
                <h3>Email: {user?.email}</h3>
                <img src={user?.photoURL} alt="" />
            </div>}


        </div>
    );
};

export default Login;