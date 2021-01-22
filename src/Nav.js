import React, { useEffect, useState } from 'react'
import './Nav.css'


function Nav() {
  const [show, handleShow] = useState(false)
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  
  
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      
      <img
        className="nav__avatar"
        src="https://image.freepik.com/free-photo/retro-film-reel-burn-background_271825-14.jpg"
        alt="Netflix Logo"
      />
    </div>
  )
}

export default Nav
