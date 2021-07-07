import React, { useContext } from 'react'
import Navigation from '../components/Navigation'
import HomeContainer from '../components/HomeContainer'
import { AuthContext } from "../App"

export default function HomePage() {

	const { AuthState } = useContext(AuthContext) 

    return (
        <div className="">
            <Navigation />
            { AuthState.isAuthenticated ? <HomeContainer /> : "Veuillez vous connecter pour accéder au contenu de cette page" }
        </div>
    )

}
