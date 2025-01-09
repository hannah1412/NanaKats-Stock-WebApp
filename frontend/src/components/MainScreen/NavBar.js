import React, { useEffect, useState } from 'react'
import '../../App.css'
import styles from './navigationBar.module.css'
import Link from 'next/link';
import Image from 'next/image';

import { GiChest } from "react-icons/gi";
import { AiFillProduct } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { GiPowder } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

import NanaLogo from '../../../public/logo.png';


const NavBar = () => {

    const sideBarMenu = [
        {
            id: 0, 
            icon: <GiChest />, 
            text: "Inventory", 
            link: "/Main",
        }, 
        {
            id: 1, 
            icon: <GiPowder/>, 
            text: "Raw materials", 
            link: "/Main/Materials",
        },
        {
            id: 2, 
            icon: <AiFillProduct />, 
            text: "My products", 
            link: "/Main/Products",
        },
        {
            id: 3, 
            icon: <GiCook />, 
            text: "My recipes",
            link: "/Main/Recipes",
        }, 
    ];
  return (
    <main className={styles['sideBar']}>
        {/* TO DO: home button + user's roles/ profile */}
        
        <Image src={NanaLogo} className={styles['logo']}/>
        <div className={styles['profile']}>
            {/* <h1>Gwendoline Telford</h1>
            <h3>CEO/SEO</h3> */}

            <Link href='/Main'> <button> <FaHome/> </button></Link>
        </div>

        <div className={styles['tabs']}>
            {sideBarMenu.map(item => {
                return <Link href={item.link}>
                    <button> {item.icon} {item.text}</button>
                </Link>
            })}
        </div>
    </main>
  )
}

export default NavBar
