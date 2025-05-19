import React from 'react'
import NavBar from './NavBar'
import Footer from '../Footer'

import "../../styles/SoftwareUniversale.css"
import ChatBot from './ChatBot';

const PatientWrapper = ({ children }) => {
  return (
    <>
      <div className='PatientWrapper_wrapper'>
        <div className='navbar-container'>
          <NavBar />
        </div>
        <div className='PatientWrapper'>{children}</div>
        <ChatBot /> 
      </div>
      <Footer addClassCondition={"sotware"}/>
    </>
  );
};

export default PatientWrapper;