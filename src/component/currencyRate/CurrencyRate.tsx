import React, {useContext, useEffect} from 'react';
import TitleTile from "../titleTile/TitleTile";
import {GetDate} from "../../util/GetDate";
import {CurrencyListFullName, CurrencyListShortName} from "../../model/Currency";
import "./CurrencyRate.scss";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import DateField from "../dateField/DateField";
import FormRow from "../formRow/FormRow";

interface ICurrencyRate {
    actualDate: Date,
    setActualDate: (value: Date) => void
}

const CurrencyRate = observer(({
                                   actualDate,
                                   setActualDate
                               }: ICurrencyRate) => {

    const currencyRateStore = useContext(StoreContext).currencyRateStore;

    /**
     * Получаем данные за период
     */
    useEffect(() => {
        currencyRateStore.getCurrencyPeriod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Получаем курсы валют на дату
     */
    useEffect(() => {
        currencyRateStore.getCurrencyDay(GetDate.convertDateToString(actualDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualDate]);

    return (
        <div className="currencyRate">
            <TitleTile><span>Курсы на</span></TitleTile>
            <FormRow className="date"
                     label=""
                     children={<DateField date={actualDate} setDate={setActualDate}/>}
            />

            <a href="https://www.nbrb.by/statistics/rates/ratesdaily.asp"
               title="currency"
               target="_blank" rel="noreferrer"
               className="siteNBRB">по нацбанку РБ
            </a>
            <div className="value USD">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.USD}</span>
                        <span>{CurrencyListShortName.USD} - {CurrencyListShortName.BYN}</span>
                        <span></span>
                    </span>
                <span className="amount">{currencyRateStore.amountUSD}</span>

            </div>
            <div className="value EUR">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.EUR}</span>
                       <span>{CurrencyListShortName.EUR} - {CurrencyListShortName.BYN}</span>
                        <span></span>
                    </span>
                <span className="amount">{currencyRateStore.amountEUR} </span>
            </div>
            <div className="value RUB">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.RUB}</span>
                        <span>100 {CurrencyListShortName.RUB} - {CurrencyListShortName.BYN}</span>
                    </span>
                <span className="amount">{currencyRateStore.amountRUB}</span>
            </div>
            <div className="value PLN">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.PLN}</span>
                        <span>10 {CurrencyListShortName.PLN} - {CurrencyListShortName.BYN}</span>
                    </span>
                <span className="amount">{currencyRateStore.amountPLN}</span>
            </div>
        </div>
    );
});

export default CurrencyRate;