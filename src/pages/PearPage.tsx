import React, {useEffect, useState} from 'react';
import {ResponseCurrencyPeriod} from "../model/ResponseCurrencyPeriod";
import {server} from "../App";
import PaySection from "../component/paySection/PaySection";
import {GetDate} from "../util/GetDate";
import StatisticSection from "../component/statisticSection/StatisticSection";
import "./PearPage.scss";
import TitlePage from "../component/titlePage/TitlePage";

/**
 * Страница Строительства грушвиля
 */
const PearPage = () => {
    const [currencyAmountToday, setCurrencyAmountToday] = useState<ResponseCurrencyPeriod>();
    const [currencyAmountTomorrow, setCurrencyAmountTomorrow] = useState<ResponseCurrencyPeriod>();

    useEffect(() => {
        server.getCurrencyDay()
            .then((response) => setCurrencyAmountToday(response))
    }, []);

    useEffect(() => {
        server.getCurrencyDay(GetDate.getTomorrowDate())
            .then((response) => setCurrencyAmountTomorrow(response))
    }, []);


    return (
        <div className="pearPage">
            <TitlePage title="Рассрочки"/>
            <StatisticSection currencyAmountToday={currencyAmountToday?.Cur_OfficialRate}/>
            <PaySection currencyAmountToday={currencyAmountToday?.Cur_OfficialRate}
                        currencyAmountTomorrow={currencyAmountTomorrow?.Cur_OfficialRate}/>
        </div>
    );
};

export default PearPage;