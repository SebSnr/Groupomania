import React from 'react';
import Connexion from '../components/Connexion';
import SocialBar from '../components/SocialBar';

export default function Login() {



    return (
        <div className="loginContainer">
            <div className="loginContainer__header">
                <img src="/img/icon-left-font.svg" alt="Logo Groupomania" className="loginLogo"/>
                <p>Bienvenue sur le site intranet de Groupomania</p>
            </div>
                <Connexion />
                {/* connexionContent={connexionContent} setConnexionContent={setConnexionContent} */}
                <SocialBar />
        </div>
    )
}

