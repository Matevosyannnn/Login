import React from 'react'
import useDevice from "../../hooks/useDevice"
import HeaderNav from "../HeaderNav/HeaderNav"
import HeaderNavMobile from "../HeaderNavMobile/HeaderNavMobile"
import User from "../User/User"
import style from './Header.module.css'


const Header = () => {
    const {isMobile} = useDevice()

    return (
        <header className={style.Header}>
            <div className={style.container}>
                {isMobile ?
                    <HeaderNavMobile /> :
                    <HeaderNav />
                }
                <User />
            </div>
        </header>
    )
}

export default Header