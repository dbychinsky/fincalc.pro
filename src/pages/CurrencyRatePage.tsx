import React from 'react';
import "./CurrencyRatePage.scss";
import TitlePage from "../component/titlePage/TitlePage";
import AreaChartComponent from "../component/charts/AreaChartComponent";
import CurrencyExchangeSection from "../component/currencyExchangeSection/CurrencyExchangeSection";
import CurrencyRate from "../component/currencyRate/CurrencyRate";

/**
 * Страница изменений рейтинга валюты
 */
const CurrencyRatePage = () => {
    return (
        <div className="currencyRatePage">
            <TitlePage title="Курсы валют"/>
            <CurrencyRate/>
            <CurrencyExchangeSection/>
            <AreaChartComponent/>
        </div>
    );
};

export default CurrencyRatePage;