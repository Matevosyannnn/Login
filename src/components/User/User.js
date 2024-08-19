import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/slices/userSlice"
import UserS from '../../assets/SVG/UserS'
import style from './User.module.css'


const User = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userRef = useRef(null)

    useEffect(() => {
        if (user?.id) {
            userRef.current.style.maxHeight = userRef.current.scrollHeight + 'px'
        }
    }, [user])

    const handleClick = () => {
        if (userRef.current.style.maxHeight) {
            userRef.current.style.maxHeight = null
        } else { 
            userRef.current.style.maxHeight = userRef.current.scrollHeight + 'px'
        }
    }

    const logOut = () => {
        userRef.current.style.maxHeight = null
    }

    return (
        <div className={style.user}>
            <div className={style.userIcon} onClick={handleClick}>
                {user?.image ? 
                    <img src={user.image} alt='user'/> :
                    <UserS /> 
                }
            </div>
            <div ref={userRef} className={style.userInfo}>
                {user?.image ?
                    <>
                        <div className={style.mainInfo}>
                            <img src={user.image} alt='user'/>
                            <h3 className={style.fullName}>{user.firstName} {user.lastName}</h3>
                        </div>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <div className={style.logOutBtn}>
                            <button onClick={logOut}>Log out</button>
                        </div>
                    </> :
                    <p className={style.notAuthorized}>Login to see more information</p>
                }
            </div>
        </div>
    )
}

export default User