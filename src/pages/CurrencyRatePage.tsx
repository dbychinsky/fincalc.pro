import React, {useContext, useEffect} from 'react';
import "./CurrencyRatePage.scss";
import TitlePage from "../component/titlePage/TitlePage";
import {StoreContext} from "../App";
import AreaChartComponent from "../component/charts/AreaChartComponent";
import CurrencyExchangeSection from "../component/currencyExchangeSection/CurrencyExchangeSection";
import {observer} from "mobx-react";
import CurrencyRate from "../component/currencyRate/CurrencyRate";

export type RateDynamicChart = {
    day: string,
    USD: number,
    EUR: number,
    RUB: number,
    PLN: number
}

/**
 * Страница изменений рейтинга валюты
 */
const CurrencyRatePage = observer(() => {

    const currencyRateStore = useContext(StoreContext).currencyRateStore;
    const areaChartStore = useContext(StoreContext).areaChartStore;

    
    /**
     * Получаем данные за период
     */
    useEffect(() => {
        currencyRateStore.getCurrencyPeriod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Получаем курсы валют на сегодня
     */
    useEffect(() => {
        currencyRateStore.getCurrencyDay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Конвертируем данные
     */
    useEffect(() => {
            if (currencyRateStore.rateDynamicUSD !== undefined) {
                areaChartStore.setRateDynamic(
                    currencyRateStore.rateDynamicUSD,
                    currencyRateStore.rateDynamicEUR,
                    currencyRateStore.rateDynamicRUB,
                    currencyRateStore.rateDynamicPLN,
                );
            } // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currencyRateStore.rateDynamicUSD,
            currencyRateStore.rateDynamicEUR,
            currencyRateStore.rateDynamicRUB,
            currencyRateStore.rateDynamicPLN]
    );

    return (
        <div className="currencyRatePage">
            <TitlePage title="Курсы валют"/>
            <CurrencyRate amountUSD={currencyRateStore.amountUSD}
                          amountEUR={currencyRateStore.amountEUR}
                          amountRUB={currencyRateStore.amountRUB}
                          amountPLN={currencyRateStore.amountPLN}
            />

            <CurrencyExchangeSection/>

            <AreaChartComponent/>
        </div>
    );
});

export default CurrencyRatePage;