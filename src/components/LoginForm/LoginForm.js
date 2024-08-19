import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, userActions } from '../../store/slices/userSlice'
import IMAGES from '../../assets/images/index'
import GoogleS from '../../assets/SVG/GoogleS'
import AppleS from '../../assets/SVG/AppleS'
import style from './LoginForm.module.css'

const LoginForm = () => {
    const user = useSelector(selectUser)
    const [error, setError] = useState(false)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        const data = {
          username: usernameRef.current.value,
          password: passwordRef.current.value
        }

        dispatch(userActions.login(data))

        e.preventDefault()
    }
    
    return (
      <form onSubmit={handleSubmit} className={style.LoginForm}>
        
        <div className={style.formTitle}>
          <img src={IMAGES.greenLogo} alt="logo" />
          <h1>Login to account.</h1>
          <p>Don't have an account? <a href='#!'>Sign Up</a></p>
        </div>

        <div className={style.inputsWrapper}>
          <div>
              <p className={style.inputTitle}>Username</p>
              <input 
                ref={usernameRef} 
                className={style.input} 
                type="text" 
                placeholder='Steven'
                style={{border: `1px solid ${error ? 'red' : '#D2CECE'}`}} 
              />
          </div>
          <div>
              <p className={style.inputTitle}>Password</p>
              <input 
                ref={passwordRef} 
                className={style.input} 
                type="password" 
                autoComplete="true" 
                placeholder='*************'
                style={{border: `1px solid ${error ? 'red' : '#D2CECE'}`}} 
              />
          </div>
          <p className={style.error} style={{display: error ? 'block' : 'none'}}>
            {error ? 'Incorrect login or password' : ''}
          </p>
          <button disabled={user?.id} className={style.loginButton}>Sign In</button>
        </div>

        <p>OR</p>

        <div className={style.socialBtnsWrapper}>  
          <button disabled={true}><GoogleS /></button>
          <button disabled={true}><AppleS /></button>
        </div>
      </form>
    )
}

export default LoginForm