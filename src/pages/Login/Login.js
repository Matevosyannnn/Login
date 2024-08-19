import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import IMAGES from '../../assets/images'
import useDevice from '../../hooks/useDevice'
import style from './Login.module.css'
import Header from '../../components/Header/Header'


const Login = () => {
  const { isMobile } = useDevice()  

  return (
    <div className={style.wrapper}>
        <Header />
        <div className={style.Login}>
            <div className={style.windowLogin}>
                <div className={style.loginForm}>
                    <LoginForm />
                </div>
                <div 
                    className={style.loginBg} 
                    style={{background: `url(${IMAGES.backgroundImg}) center center / cover no-repeat `}}
                >
                {
                    isMobile ? <img src={IMAGES.whiteLogo} alt="white-logo" /> : ''
                }    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login