import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNavigator from './AccountNavigator'
import PlaceImg from '../PlaceImg';
import axios from 'axios';
import BookingDates from '../BookingDates';



export default function BookingsPage() {
    const [bookings, setBookings] = useState('')
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, [])

    return (
        <div>
            <AccountNavigator />
            <div>
                {bookings.length > 0 && bookings.map((booking) => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex gap-4 bg-gray-200 mb-2 overflow-hidden rounded-xl'>
                        <div className='w-48'>
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl border-b border-gray-300 mb-3'>{booking.place.title}</h2>

                            <div className='flex gap-1'>
                                <BookingDates booking={booking}/>
                            </div>

                            <div className='flex py-2 gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                Total price: ${booking.price}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
