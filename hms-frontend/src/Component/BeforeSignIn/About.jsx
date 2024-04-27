import React from "react";
import AboutBackground from "../../assets/about-background.png";

import { BsFillPlayCircleFill } from "react-icons/bs";
import './About.css';
const About = () => {
    return (
        <div className="about-section-container">
            <div className="about-background-image-container">
                <img src={AboutBackground} alt="" />
            </div>
            <div className="about-section-text-container">
                <p className="primary-subheading">About</p>
                <h1 className="primary-heading">
                    Phần mềm quản lý khách sạn sẽ giúp bạn quản lý khách sạn dễ dàng
                </h1>

                <div className="about-buttons-container">
                    <button className="secondary-button">Learn More</button>
                    <button className="watch-video-button">
                        <BsFillPlayCircleFill /> Watch Video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
