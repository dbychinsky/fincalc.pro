import React from 'react';
import "./MainPage.scss";
import RateSection from "../component/rateSection/RateSection";

const MainPage = () => {
    return (
        <div className="mainPage">
            <div className="wrapper">
                <div className="logotype"><span>F</span><span>C</span></div>
                <div className="logoText">Financial Calculator</div>
                <RateSection/>
            </div>
        </div>
    );
};

export default MainPage;