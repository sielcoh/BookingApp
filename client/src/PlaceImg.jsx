import React from 'react'

export default function PlaceImg({ place, index = 0, className= null }) {
    if (!place.photos?.length) {
        return ""
    }
    if(!className){
        className = 'object-cover rounded-xl '
    }
    return (
        <div>
            {place.photos.length > 0 && (
                <img className={className + 'h-[128px] w-[128px]'} src={'http://localhost:4000/uploads/' + place.photos[0]} alt='' />
            )}
        </div>
    )
}
