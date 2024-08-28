import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function SinglePlace() {
    const [place, setPlace] = useState([])
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data)
            })
        }
    }, [id])

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48 mb-4">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div key={photo} className='mx-auto w-[700px]'>
                            <img className='object-cover' src={'http://localhost:4000/uploads/' + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }




    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <a className='my-2 inline-flex font-semibold underline gap-1' target='_blank' href={'https://maps.google.com/?q=' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>
            <div className="relative">
                <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden'>

                    <div>
                        {place.photos?.[0] && (
                            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />)}
                    </div>

                    <div className='overflow-hidden'>
                        {place.photos?.[1] && (
                            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
                        )}
                        {place.photos?.[2] && (
                            <img className='aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
                        )}
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-3 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 inline-flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span className='leading-0'>Show more photos</span>
                    </button>
                </div>
            </div>
            <div className='my-4'>
                <h2 className='font-semibold text-2xl'>Description</h2>
                {place.description}
            </div>
            <div className='grid grid-cols-2'>
                <div className='bg-white shadow p-4 rounded-2xl'>
                    <h2 className='text-2xl text-center'>
                        Price: ${place.price} / per night
                    </h2>
                    <div className='border rounded-2xl mt-4'>
                        <div className='flex'>
                            <div className='py-3 px-4'>
                                <label>Check In:</label>
                                <input type="date" />
                            </div>
                            <div className='py-3 px-4 border-l'>
                                <label>Check Out:</label>
                                <input type="date" />
                            </div>
                        </div>
                        <div className='py-3 px-4 border-t'>
                            <label>Number of guests:</label>
                            <input type="number" value={1}/>
                        </div>                    
                        </div>
                    <button className='primary mt-4'>Book this place</button>
                </div>
            </div>
        </div>
    )
}
