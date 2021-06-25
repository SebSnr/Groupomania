import React from 'react'
import { SocialIcon } from 'react-social-icons';

export default function SocialBar() {
    return (
        <div>
            <button><SocialIcon network="facebook" /></button>
            <button><SocialIcon network="youtube" /></button>
            <button><SocialIcon network="twitter" /></button>
        </div>
    )
}
