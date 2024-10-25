'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import "../sass/navbar.scss"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Services', href: '/services' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
  ];

  const logoVariants = {
    initial: { pathLength: 0, fill: 'rgba(52, 211, 153, 0)' },
    animate: {
      pathLength: 1,
      fill: 'rgba(52, 211, 153, 1)',
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`navbar-container ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-content">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <motion.path
                d="M10 25C10 15 15 10 25 10C35 10 40 15 40 25C40 35 35 40 25 40C15 40 10 35 10 25Z"
                stroke="#34d399"
                strokeWidth="2"
                variants={logoVariants}
                initial="initial"
                animate="animate"
              />
              <motion.path
                d="M25 15C30 15 35 20 35 25C35 30 30 35 25 35"
                stroke="#34d399"
                strokeWidth="2"
                fill="none"
                variants={logoVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
          </Link>
        </motion.div>

        <div className="desktop-nav">
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.span
                  className="nav-link"
                  whileHover={{
                    scale: 1.1,
                    color: '#34d399',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mobile-menu"
          whileTap={{ scale: 0.9 }}
        >
          <button onClick={() => setIsOpen(!isOpen)}>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.div>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <span className="mobile-link">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;