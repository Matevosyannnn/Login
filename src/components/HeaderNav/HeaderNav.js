import React from 'react'
import style from './HeaderNav.module.css'

const HeaderNav = () => {
  return (
    <nav className={style.nav}>
        <ul className={style.navList}>
            <li className={style.navListItem}><a href='#!'>Home</a></li>
            <li className={style.navListItem}><a href='#!'>Contact</a></li>
            <li className={style.navListItem}><a href='#!'>About</a></li>
        </ul>
    </nav>
  )
}

export default HeaderNav