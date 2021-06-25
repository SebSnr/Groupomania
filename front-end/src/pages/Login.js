import React from 'react';
import Connexion from '../components/Connexion';
import SocialBar from '../components/SocialBar';

export default function Login() {

    return (
        <div className="loginContainer card">
            <div className="loginContainer__header">
                {/* <img src="/img/icon-left-font.svg" alt="Logo Groupomania" /> */}
                <h1>Bienvenue chez la communauté</h1><br/>
                <img src="/img/groupomania transparent.png" alt="Logo Groupomania" />
            </div>
                <Connexion />
                {/* connexionContent={connexionContent} setConnexionContent={setConnexionContent} */}
                <SocialBar />
        </div>
    )
}

