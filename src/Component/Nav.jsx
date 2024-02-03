import React, { useState } from 'react'
import Logo from '../assets/images/logo.webp'
import { Link } from 'react-router-dom'
import { CiMail } from "react-icons/ci";
import ProfileList from './ProfileList';

const Nav = () => {

    const [profileList, setProfileList] = useState(false)
    const [active, setActive] = useState('dashboard')

    const closeNav = (linkname) => {
        setActive(linkname)
    }

    return (
        <>
            <nav>
                <div className="left-nav">
                    <div className="logo"><img src={Logo} alt="logo" /></div>
                    <ul>
                        <Link to='/'><li className={active === 'dashboard' ? 'active' : 'unactive'} onClick={() => closeNav('dashboard')}>Dashboard</li></Link>
                        <Link to='contactsearch'><li className={active === 'contact' ? 'active' : 'unactive'} onClick={() => closeNav('contact')}>Contact Search</li></Link>
                    </ul>
                </div>
                <div className="right-nav">
                    <div className="profile" onClick={() => setProfileList(!profileList)}> L</div>
                    {profileList ?
                        <div className="profile-list-box">
                            <ul>
                                <li><span><CiMail /> </span><Link to='mailto:sasiganth@adapt.io' className='mail_user'>sasiganth@adapt.io</Link></li>
                                {ProfileList.map((list) =>
                                    <li key={list.id} className='list_map'><span><list.icon /> </span><Link to='' className='mail_user_list'>{list.namelist}</Link></li>
                                )}

                            </ul>
                        </div> : null
                    }
                </div>
            </nav>

        </>
    )
}

export default Nav