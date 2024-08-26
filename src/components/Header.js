import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import store from '../utils/store';

const Header = () => {
    const cookies=new Cookies(null,{path:'/'})
    const LoginStatus=useSelector(store=>store.auth.userData)
    
    
    
    // State to manage mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [toggleLogin,setToggleLogin]=useState('Logout')
    
    useEffect(()=>{
    const token=cookies.get('token')
    if(cookies.get('token')){
      setToggleLogin("Logout")
    }
  })
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Gchat
            </a>
          </div>

          {/* Desktop Navigation */}
          {cookies.get('token') && cookies.get('role')=='user'?<nav className="hidden md:flex space-x-4 items-center">
            <Link to='/addgroup' className="text-gray-600 hover:text-indigo-500">
              Add Group
            </Link>
            <a href="#" className="text-gray-600 hover:text-indigo-500">
              About
            </a>
            {/* <a href="#" className="text-gray-600 hover:text-indigo-500">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-500">
              Contact
            </a> */}
          </nav>:""}

          {/* Search Bar (Hidden on Mobile) */}
          {/* <div className="hidden md:block flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}

          {/* Login Button (Hidden on Mobile) */}
          {cookies.get('token')?<div className="hidden md:block">
            <Link to={cookies.get('token')?"/logout":"/"} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            {toggleLogin}
            </Link>
          </div>:""}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-indigo-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <Link to='/logout'>Logout</Link>
            {cookies.get('token') && cookies.get('role')=='user'?<nav className="flex flex-col space-y-2 pb-4">
              <Link to='/addgroup' className="text-gray-600 hover:text-indigo-500">
              Add Group
            </Link>
            <Link to='/logout' className="text-gray-600 hover:text-indigo-500">Logout</Link>
            <a href="#" className="text-gray-600 hover:text-indigo-500">
              About
            </a>
              {/* <a href="#" className="text-gray-600 hover:text-indigo-500">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-500">
                Contact
              </a> */}
              {/* <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                Login
              </button> */}
              {cookies.get('token')?<div className="hidden md:block">
            <Link to={cookies.get('token')?"/logout":"/"} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            {toggleLogin}
            </Link>
          </div>:""}
            </nav>:""}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;