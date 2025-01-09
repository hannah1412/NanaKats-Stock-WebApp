import React, { use, useState } from 'react'
import Image from 'next/image'
import flowerImg from "../../../public/images/flower.png"
import styles from './login.module.css'
import '../../App.css'

import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Link from 'next/link';
const LoginPage = () => {
  const [ show, setShow ] = useState(false)       // pwd
 
  const handleToggle = () => {
    setShow((prev) => !prev)
  }
  return (
    <main>
      <Image src={flowerImg} className={styles.sideImg} alt={'flowers'}/>
    
      {/* Login panel */}
      <form className={styles['loginForm']}>
        <h1>Welcome Back</h1>

        <div>
          <h3>Username*</h3>
          <input type='text'  name='text' required/>
          <h3>Password </h3>
          <input type='password' name='password' minLength={8} required/> 
          <span className={styles['pwdIcon']} onChange={handleToggle}>
            {show ? <FaEyeSlash/> : <FaRegEye/>}
          </span>

          <Link href={'/Main'}> <button> Login </button></Link>
        </div>
      </form>

    </main>
  )
}

export default LoginPage