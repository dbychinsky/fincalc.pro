import React from 'react';
import "./MainPage.scss";
import RateSection from "../component/rateSection/RateSection";
import Navigation from "../component/navigation/Navigation";

const MainPage = () => {
    return (
        <div className="mainPage">
            <RateSection/>
            <div className="wrapper">
                <div className="logotype"><span>F</span><span>C</span></div>
                <div className="logoText">Financial Calculator</div>
                <Navigation/>
            </div>
        </div>
    );
};

export default MainPage;