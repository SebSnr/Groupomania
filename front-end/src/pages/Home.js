import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeContent from '../components/HomeContent'


export default function Home() {

    return (
        <div className="homeContainer">
            {/* <img src="/img/logoTransparent.png" className="bg-img/" /> */}
            <Header />
            <HomeContent />
            <Footer />
        </div>
    )

}
