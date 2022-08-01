import React from 'react';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import zxcvbn from 'zxcvbn';
import { motion , AnimatePresence } from 'framer-motion';


import './PasswordStrength.css';

function PasswordStrength({ password }) {
  const PasswordResultStrength = zxcvbn(password);
  const num = PasswordResultStrength.score * 100/4;

  const switchPasswordStrength = () => {
    switch(PasswordResultStrength.score) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Very strong';
      default: 
        return '';
    }
  }

  const switchResults = () => {
    switch(PasswordResultStrength.score) {
      case 0:
        return '#FA002F';
      case 1:
        return '#e39b14';
      case 2:
        return '#b5cf13';
      case 3:
        return '#8acf13';
      case 4:
        return '#4bcf13';
      default: 
        return 'none';
    }
  }
  console.log(num);
  return (
    
    <div className='password-container'>
      <AnimatePresence
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}
    >
      <motion.div className='password-bar' style={{ width: `${num}%`, background: `${switchResults()}`}}></motion.div>
      <p>{switchPasswordStrength()}</p>
      </AnimatePresence>

    </div>
    
  )
}

export default PasswordStrength