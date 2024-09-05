import React from 'react'
import { useState } from 'react';
export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

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
        <div>
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
        </div>
    )
}
