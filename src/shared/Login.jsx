import React from 'react';
import { useStateContext } from '../context/StateContext';
import { motion } from 'framer-motion';


const Login = () => {

    const { signIn } = useStateContext();

    const handleSignIn = () => {
        signIn();
    }

    return (
        <motion.div 
            className='login-container'
            initial={{ opacity: 0, y: -100}}
            animate={{ opacity: 1, y: 0, transition: { delay: 0, duration: 1 }}}
        >
            <h2>LOG IN</h2>
            <p>Login with your Spotify account to see your top tracks and artists</p>
            <button className='btn' onClick={handleSignIn} >Login with Spotify</button>
        </motion.div>
    )
}

export default Login