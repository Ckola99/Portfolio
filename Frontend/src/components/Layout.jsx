import React, { useState } from 'react'
import hamburger from '../assets/hamburger.png'
import { Outlet, useLocation, Link } from 'react-router-dom'
import Footer from './Footer';
import close from '../assets/close.png'



const Layout = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsMenuExpanded(false);
  };

  return (
    <div className={`${!isHomepage ? 'bg-navy-blue-primary' : ''} ${isMenuExpanded && 'bg-navy-blue-primary'} min-h-screen rounded-lg border border-line-color m-3 font-fira-code flex flex-col`}>
      <nav className='text-light-gray p-3 border-b border-line-color flex justify-between items-center'>
        <h1> christopher-kola</h1> <button onClick={toggleMenu} className='md:hidden'><img className='w-[18px] h-4' src={ isMenuExpanded ? close : hamburger} alt="menu hamburger" /></button>
      </nav>
      {isMenuExpanded ? (
        <div className=" text-white flex flex-col flex-1 justify-between">
          {/* Your expanded menu content goes here */}
          <ul>
            <li className="border-b border-line-color p-3"><Link onClick={closeMenu} to="/">_hello</Link></li> {/* Link to homepage */}
            <li className="border-b border-line-color p-3"><Link onClick={closeMenu} to="/about">_about</Link></li> {/* Link to the About page */}
            <li className="border-b border-line-color p-3"><Link onClick={closeMenu} to="/projects">_projects</Link></li> {/* Link to the Projects page */}
            <li className="border-b border-line-color p-3"><Link onClick={closeMenu} to="/contact">_contact-me</Link></li> {/* Link to the Contact page */}
          </ul>
        </div>
      ) : (<main className='flex flex-1'>
        <Outlet />
      </main>)}
      {!isHomepage && <Footer />}
    </div>
  )
}

export default Layout
