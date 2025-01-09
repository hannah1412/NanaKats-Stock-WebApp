import React from 'react'
import background from '../../../public/images/green-grunge-paper-background.jpeg';
import Image from 'next/image';
import styles from './signup.module.css'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <main className={styles.background}>
      <div > Signing Up</div>

      <form className={styles['form']}>
        <div className={styles['title_text']}> 
          <p> First name </p>
          <input className={styles['input']}/>
          <p> Last name </p>
          <input className={styles['input']}/>
          <p> Username </p>
          <input className={styles['input']}/>
          <p>Email</p>
          <input className={styles['input']}/>
          <p>Enter password</p>
          <input className={styles['input']}/>
          <p>Confirm password</p>
          <input className={styles['input']}/>
        </div>
        <Link href={'/Main'}>
          <button className={styles['button']}> Register </button>
        </Link>
      </form>
      
    </main>
  )
}

export default SignUpPage