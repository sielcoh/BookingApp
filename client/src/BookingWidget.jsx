import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { UserContext } from './UserContext'

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const { user } = useContext(UserContext);
    const nav = useNavigate()

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    })

    let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async () => {
        const info = {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        };
        const { data } = await axios.post('/bookings', info);
        const bookingId = data._id;
        nav(`/account/bookings/${bookingId}`);
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <h2 className='text-2xl text-center'>
                Price: ${place.price} / per night
            </h2>
            <div className='border rounded-2xl'>
                <div className='flex'>
                    <div className='py-3 px-4'>
                        <label>Check In:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check Out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={e => setNumberOfGuests(e.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className='py-3 px-4 border-t'>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />

                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                    </div>
                )}
            </div>
            <button className='primary mt-4' onClick={bookThisPlace}>
                Book this place
                {numberOfNights > 0 && (<span> ${numberOfNights * place.price}</span>)}
            </button>
        </div>
    )
}
