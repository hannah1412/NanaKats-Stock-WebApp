import React from 'react'
import styles from './navigationBar.module.css'
import { useState } from 'react'
import { IoMenu } from "react-icons/io5";

import NavBar from './NavBar';

const WelcomePage = () => {
    const [collaspeTab, setCollapseTabOpen] = useState(false); 
    const [ openSideBar, setSideBarOpen ] = useState(true);

  return (
    <main className={styles['background']}>
        {/* side menu  */}
        <NavBar />
    </main>
  )
}

export default WelcomePage