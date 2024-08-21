import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import AccountNavigator from './AccountNavigator';


export default function PlacesPage() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places')
            .then(({ data }) => {
                setPlaces(data);
            })
    }, [])

    return (
        <div>
            <AccountNavigator />
            <div className='text-center'>
                <Link to={'/account/addnewplace'} className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>

            <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/addnewplace/' + place._id} key={place._id} className='flex cursor-pointer gap-6 bg-gray-100 rounded-2xl mt-4'>
                        {place.photos.length > 0 && place.photos.map(photo => {
                            return (
                                <div key={photo}>
                                    <img className='rounded-2xl w-32 h-32' key={photo} src={'http://localhost:4000/uploads/' + photo} alt='' />
                                </div>
                            )
                        })}

                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
