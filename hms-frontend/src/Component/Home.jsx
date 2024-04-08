import React from 'react';
import Navbar from './Navbar';
import BannerBackground from '../assets/background-homepage.jpg';
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
const Home = () => {
    return (<>
        <div className='home-container'>
            <Navbar />
            <div className='home-banner-container'>
                <img src={BannerBackground} className="home-bannerImage-container" alt="" />

                <div className='home-text-section'>
                    <h1 className='primary-heading'>
                        Hotel management system
                    </h1>
                </div>


            </div>
        </div>
        <About />
        <Contact />
        <Footer />
    </>
    );
}
export default Home;