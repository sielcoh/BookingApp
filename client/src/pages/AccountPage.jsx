import React, { useContext } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';


export default function AccountPage() {
    const { user, ready, setUser } = useContext(UserContext)
    const nav = useNavigate()

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logOut = async() => {
        await axios.post('/logout');
        nav('/')
        setUser(null)
    }

    if (!ready) {
        return 'Loading...';
    }

    if (!user && ready) {
        nav('/login');
    }

    const linkClasses = (type = null) => {
        let classes = 'p-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommondations</Link>
            </nav>

            {subpage === 'profile' && (
                <div className='text-center mx-auto max-w-lg'>
                    Logged in as {user?.name} {user?.email} <br />
                    <button onClick={logOut} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}
        </div>
    )
}
