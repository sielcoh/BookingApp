import React from 'react'
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AccountNavigator from './AccountNavigator';
import axios from 'axios';

export default function AddNewPlace() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const { pathname } = useLocation()
    const nav = useNavigate();

    let id = pathname.split('/')?.[3];
    useEffect(() => {
        if (!id) return
        else {
            axios.get('/places/' + id)
                .then(response => {
                    const { data } = response;
                    setTitle(data.title);
                    setAddress(data.address);
                    setDescription(data.description);
                    setAddedPhotos(data.photos);
                    setPerks(data.perks);
                    setExtraInfo(data.extraInfo);
                    setCheckIn(data.checkIn)
                    setCheckOut(data.checkOut)
                    setMaxGuests(data.maxGuests)
                    setPrice(data.price)
                })
        }
    }, [id])

    const savePlace = async (e) => {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        }
        if (id) {
            await axios.put('/places', {
                id, ...placeData
            });
        } else {
            await axios.post('/places', {
                ...placeData
            });
        }
        nav('/account/placepage');
    }

    return (
        <div>
            <AccountNavigator />
            <form onSubmit={savePlace}>
                <h2 className='text-2xl mt-4'>Tile</h2>
                <p className='text-gray-500 text-sm'>Title for your place. should be short and catchy as in advertisment</p>
                <input
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <h2 className='text-2xl mt-4'>Address</h2>
                <p className='text-gray-500 text-sm'>Address to this place</p>
                <input
                    type='text'
                    placeholder='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                <h2 className='text-2xl mt-4'>Descripision</h2>
                <p className='text-gray-500 text-sm'>Descripision of the place</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <Perks selected={perks} onChange={setPerks} />
                <h2 className='text-2xl'>Extra Info</h2>
                <p className='text-gray-500 text-sm'>house rules, etc</p>
                <textarea
                    value={extraInfo}
                    onChange={(e) => { setExtraInfo(e.target.value) }} />

                <h2 className='text-2xl mt-4'>Check in&out times, max guests</h2>
                <p className='text-gray-500 text-sm'>add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input
                            type="text"
                            placeholder='14'
                            value={checkIn}
                            onChange={e => { setCheckIn(e.target.value) }} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input
                            type="text"
                            placeholder='11'
                            value={checkOut}
                            onChange={e => { setCheckOut(e.target.value) }} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input
                            type="number"
                            value={maxGuests}
                            onChange={e => { setMaxGuests(e.target.value) }} />
                    </div>
                    
                </div>
                    <div className='text-center w-32 mx-auto'>
                        <h3 className='mt-2 -mb-1 font-bold'>Price per night</h3>
                        <input
                            type="number"
                            value={price}
                            onChange={e => { setPrice(e.target.value) }} />
                    </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}
