import React from 'react';
import "./Header.scss";
import RateSection from "../rateSection/RateSection";

const Header = () => {
    return (
        <div className="header">
            {/*<div className="logotype">logotype</div>*/}
            {/*<div className="logoText">Мой финансовый калькулятор</div>*/}
            <div className="currencyContent">
                <RateSection/>
            </div>
        </div>
    );
};

export default Header;