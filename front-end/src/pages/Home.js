import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeContent from '../components/HomeContent'


export default function Home() {

    return (
        <div className="homeContainer">
            <Header />
            <HomeContent />
            <Footer />
        </div>
    )

}
