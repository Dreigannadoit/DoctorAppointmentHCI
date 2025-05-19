import React, { useState } from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'
import { motion, AnimatePresence } from 'framer-motion';

import "../../styles/SoftwareUniversale.css"
import ChatBot from './ChatBot';
import { useNavigate } from 'react-router-dom';

const PatientWrapper = ({ children }) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    // Perform any cleanup or logout logic here
    navigate('/auth'); // Or your login route
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };


  return (
    <>
      <div className='PatientWrapper_wrapper'>
        <div className='navbar-container'>
          <NavBar handleExitClick={handleExitClick} />
        </div>
        <div className='PatientWrapper'>{children}</div>
        <ChatBot /> 
      </div>
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            className="exit-confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="exit-confirm-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h3>Confirm Exit</h3>
              <p>Are you sure you want to exit the application?</p>
              <div className="button-group">
                <button className="cancel-btn" onClick={handleCancelExit}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={handleConfirmExit}>
                  Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer addClassCondition={"sotware"}/>
    </>
  );
};


export default PatientWrapper;