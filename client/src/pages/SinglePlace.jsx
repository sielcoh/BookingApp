import React from 'react'
import { useParams } from 'react-router-dom'

export default function SinglePlace() {
    const { id } = useParams()
    return (
        <div
            className='mt-8'>
                <h1>{pl}</h1>
            {id}
        </div>
    )
}
