import React, { useState } from 'react'
import hamburger from '../assets/hamburger.png'
import { Outlet, useLocation, Link, NavLink } from 'react-router-dom'
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
    <div className={`${!isHomepage ?'bg-navy-blue-primary' : ''} ${isMenuExpanded && 'bg-navy-blue-primary'} min-h-screen rounded-lg border border-line-color m-3 font-fira-code flex flex-col`}>
      <nav className='text-light-gray border-b border-line-color flex justify-between items-center md:justify-normal w-100vw'>
        <h1 className='p-3 '> christopher-kola</h1> <button onClick={toggleMenu} className='md:hidden p-3'><img className='w-[18px] h-4' src={isMenuExpanded ? close : hamburger} alt="menu hamburger" /></button>
        <ul className='hidden md:flex md:ml-[100px]'>
          <li className={`border-l border-r border-line-color py-3 px-5 ${location.pathname === '/' ? 'border-b-orange-accent border-b-4' : ''}`}>
            <NavLink
              onClick={closeMenu}
              to="/"
              className={({ isActive }) => isActive ? 'text-white' : 'text-light-gray'}>
              _hello
            </NavLink>
          </li>
          <li className={` border-r border-line-color py-3 px-5 ${location.pathname === '/about' ? 'border-b-orange-accent border-b-4' : ''}`}>
            <NavLink
              onClick={closeMenu}
              to="/about"
              className={({ isActive }) => isActive ? 'text-white' : 'text-light-gray'}>
              _about-me
            </NavLink>
          </li>
          <li className={`border-r border-line-color py-3 px-5 ${location.pathname === '/projects' ? 'border-b-orange-accent border-b-4' : ''}`}>
            <NavLink
              onClick={closeMenu}
              to="/projects"
              className={({ isActive }) => isActive ? 'text-white' : 'text-light-gray'}>
              _projects
            </NavLink>
          </li>
        </ul>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hidden md:flex border-l border-line-color  py-3 px-5 ml-auto ${isActive ? 'text-white border-b-4 border-b-orange-accent' : 'text-light-gray'}`
          }>
          _contact-me
        </NavLink>
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
