import React, { useContext } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import HomeContainer from '../components/HomeContainer'
import { AuthContext } from "../App"

export default function HomePage() {

	const { state } = useContext(AuthContext) 

    return (
        <div className="">
            <Navigation />
            { state.isAuthenticated ? <HomeContainer /> : "Veuillez vous connecter pour accéder au contenu de cette page" }
        </div>
    )

}
