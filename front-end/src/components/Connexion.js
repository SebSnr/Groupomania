import React, {useState} from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

export default function Connexion() {

    const [connexionContent, setConnexionContent] =useState()

    return (
        <div>
            { (() => {
                switch (connexionContent) {
                    case "signUp" :
                        return (
                            <div>
                                <SignUpForm /> 
                                <button onClick= {()=> setConnexionContent("login")}>Se connecter</button>
                            </div>
                        )
                    case "login" :
                        return (
                            <div>
                                <LoginForm />
                                <button onClick= {()=> setConnexionContent("signUp")}>S'inscrire</button>
                            </div>
                        )
                    default:
                        return (
                            <div>
                                <button onClick= {()=> setConnexionContent("signUp")}>S'inscrire</button>
                                ou
                                <button onClick= {()=> setConnexionContent("login")}>Se connecter</button>
                            </div>

                        )
                }          
            }) ()}

            





        </div>
    )
}


