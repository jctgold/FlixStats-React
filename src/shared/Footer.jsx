import React from 'react';
import Clock from 'react-live-clock'
import { motion } from 'framer-motion'


const Footer = () => {

    return (
        <motion.div 
            className='footer-container'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0, transition: {delay: 1, duration: 0.5 }}}>
            <p>
                <Clock  
                    format={"MMMM M, YYYY [-] h:mm:ss A"}
                    style={{color: '#FFEB80'}}
                    ticking={true} />
            </p>
            <p>Created by Julia G</p>
        </motion.div>
    )
}

export default Footer