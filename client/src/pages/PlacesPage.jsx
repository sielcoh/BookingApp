import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [discription, setDiscription] = useState('');
    const [perks, setPerks] = useState([]);
    const [exstraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, fileName];
        });
        setPhotoLink('');
    }

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })

    }

    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link to={'/account/places/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}

            {action == 'new' && (
                <div>
                    <form>
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

                        <h2 className='text-2xl mt-4'>Photos</h2>
                        <p className='text-gray-500 text-sm'>More = better</p>
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                placeholder='Add using a link ...jpg'
                                value={photoLink}
                                onChange={(e) => setPhotoLink(e.target.value)} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className='h-32 flex'>
                                    <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + link} alt='' />
                                </div>
                            ))}
                            <label className='h-32 cursor-pointer flex items-center gap-1 border bg-transparent rounded-2xl p-2 px-10 mt-2 text-xl'>
                                <input type="file" className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        <h2 className='text-2xl mt-4'>Descripision</h2>
                        <p className='text-gray-500 text-sm'>Descripision of the place</p>
                        <textarea
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)} />
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
        </div>
    )
}
