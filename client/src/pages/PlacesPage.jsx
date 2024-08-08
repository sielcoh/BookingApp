import React, { act } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PlacesPage() {
    const { action } = useParams();

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
                        <input type='text' placeholder='title' />
                        <h2 className='text-2xl mt-4'>Address</h2>
                        <p className='text-gray-500 text-sm'>Address to this place</p>
                        <input type='text' placeholder='address' />
                        <h2 className='text-2xl mt-4'>Photos</h2>
                        <p className='text-gray-500 text-sm'>More = better</p>
                        <button className='border bg-transparent rounded-2xl p-4 px-10 mt-2'>+</button>
                    </form>
                </div>
            )}



        </div>
    )
}
