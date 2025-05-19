import React, { useEffect, useState } from 'react'
import NavbarWeb from './NavbarWeb'
import NavbarWebSticky from './NavbarWebSticky';
import Footer from '../Footer';

const WebWrapper = ({ children }) => {
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <NavbarWebSticky showSticky={showSticky}/>
      <NavbarWeb />

      <div className='Web_wrapper'>{children}</div>

      <Footer/>
    </>
  );
};

export default WebWrapper;