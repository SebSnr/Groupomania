import React from 'react'

export default function ProfilePicture(props) {
        return (
            <div className={`profile-picture ${props.class}`}>
                <img src={props.photo} alt="profil" className="" />
            </div>
        )
}
