import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigator from './AccountNavigator';


export default function AccountPage() {
    const { user, ready, setUser } = useContext(UserContext)
    const nav = useNavigate()

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logOut = async () => {
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



    return (
        <div>
            
            <AccountNavigator/>
            {subpage === 'profile' && (
                <div className='text-center mx-auto max-w-lg'>
                    Logged in as {user?.name} {user?.email} <br />
                    <button onClick={logOut} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}
