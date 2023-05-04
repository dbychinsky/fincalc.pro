import React, {useState} from 'react';
import "./CurrencyRatePage.scss";
import TitlePage from "../component/titlePage/TitlePage";
import AreaChartComponent from "../component/charts/AreaChartComponent";
import CurrencyExchangeSection from "../component/currencyExchangeSection/CurrencyExchangeSection";
import CurrencyRate from "../component/currencyRate/CurrencyRate";

/**
 * Страница изменений рейтинга валюты
 */
const CurrencyRatePage = () => {

    /**
     * Состояние с выбранной датой календаря
     */
    const [actualDate, setActualDate] = useState(new Date());

    return (
        <div className="currencyRatePage">
            <TitlePage title="Курсы валют"/>
            <CurrencyRate actualDate={actualDate}
                          setActualDate={setActualDate}/>
            <CurrencyExchangeSection actualDate={actualDate}/>
            <AreaChartComponent/>
        </div>
    );
};

export default CurrencyRatePage;