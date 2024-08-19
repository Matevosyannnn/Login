import { useState } from 'react'
import style from './HeaderNavMobile.module.css'

const HeaderNavMobile = () => {
    const [active, setActive] = useState(false)

    const toggleActive = () => { 
        setActive(!active)
    }

    return (
      <nav className={style.HeaderNavMobile}>
            <label>
                <input type="checkbox" id="check" onClick={toggleActive} /> 
                <span></span>
                <span></span>
                <span></span>
            </label>
            
            <div className={style.navListWrapper} style={{left: `${active ? '-10px' : '-330px'}`}}>
                <ul className={style.navList}>
                    <li className={style.navListItem}><a href='#!'>Home</a></li>
                    <li className={style.navListItem}><a href='#!'>Contact</a></li>
                    <li className={style.navListItem}><a href='#!'>About</a></li>
                </ul>
            </div>
      </nav>
    )
}

export default HeaderNavMobile