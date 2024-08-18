import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import axios from 'axios';


export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [exstraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [places, setPlaces] = useState([])


    const nav = useNavigate();

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);

        })
    }, [])

    const addNewPlace = async (e) => {
        e.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, exstraInfo,
            checkIn, checkOut, maxGuests
        });
        nav('/account/places');

    }

    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link to={'/account/places/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}

            {action == 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
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
                            value={exstraInfo}
                            onChange={e => { setExtraInfo(e.target.value) }} />

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
                        <button className='primary my-4'>Save</button>
                    </form>
                </div>
            )}

            <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} key={place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl'>
                        {place.photos.length > 0 && place.photos.map(photo => {
                            return <div className='flex gap-2 w-32 h-32 grow shrink-0'>
                                <img className='rounded-2xl' key={photo} src={'http://localhost:4000/uploads/' + photo} alt='' />
                            </div>
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
