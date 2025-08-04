import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false); // Scroll down -> hide
            } else {
                setShowNavbar(true);  // Scroll up -> show
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Home', target: '/#home' },
        { name: 'About-Me', target: '/#about' },
        { name: 'Skills', target: '/#skills' },
        { name: 'Experience', target: '/#experience' },
        { name: 'Projects', target: '/#projects' },
        { name: 'Contact-Me', target: '/#contact' }
    ];

    return (
        <nav className={`navbar-container ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold z-20">
                    <Link to="/#home" className="text-white no-underline">Shashank</Link>
                </div>

                <div className="md:hidden flex items-center z-20">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {
                                isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )
                            }
                        </svg>
                    </button>
                </div>

                <ul className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-6 md:static md:w-auto md:bg-transparent md:py-0 md:space-y-0
                    absolute top-full left-0 w-full bg-black py-4 space-y-4 text-center
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full md:opacity-100 md:translate-y-0'}`}>
                    {navLinks.map((linkItem) => (
                        <li key={linkItem.name} className="md:my-0 my-2">
                            {linkItem.name === 'Home' ? (
                                <Link
                                    to={linkItem.target}
                                    onClick={toggleMenu}
                                    className="block py-2 md:py-0 px-3 rounded-md text-gray-200 transition-all duration-300 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 hover:scale-105"
                                >
                                    {linkItem.name}
                                </Link>
                            ) : (
                                <HashLink
                                    to={linkItem.target}
                                    smooth
                                    onClick={toggleMenu}
                                    className="block py-2 md:py-0 px-3 rounded-md text-gray-200 transition-all duration-300 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 hover:scale-105"
                                >
                                    {linkItem.name}
                                </HashLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;