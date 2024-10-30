"use client";
import '../styles/Navbar.css'; 
import logo from "../../assests/logo.svg";
import x from "../../assests/x.svg";
import discord from '../../assests/discord.svg';
import medium from "../../assests/medium.svg";
import telegram from "../../assests/telegram.svg";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

 export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className='container'>
    <div className='nav-container'>
      <nav className="navbar">   
      <div className="menu-icon" onClick={toggleMenu}>
            <FaBars size={24} /> 
          </div>  
        <div className="logo">
          <Image src={logo} alt="Logo" />
          Deri Pulse
          <div className="partition"></div>
        </div>
          <ul className={`nav-links ${isMenuOpen ? 'open' : 'closed'}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/topPools">Top pools</a></li>
            <li><a href="/topChains">Top chains</a></li>
            <li><a href="/Feed">Feed</a></li> 
          </ul>
        </nav>
        <div className='nav-social'>
          <Image src={x} alt="X" />
          <Image src={discord} alt="Discord" />
          <Image src={medium} alt="Medium" />
          <Image src={telegram} alt="Telegram" />
        </div>
      </div>
    </div>
  );
}

