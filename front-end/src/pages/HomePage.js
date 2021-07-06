import React, {useState} from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import HomeContainer from '../components/HomeContainer'
import { AuthContext } from '../App'

export default function HomePage() {

    const {state} = React.useContext(AuthContext)

    return (
        <div className="">
            <Navigation />
            <div >{state.test}</div>
            <HomeContainer />
            <Footer />
        </div>
    )

}
