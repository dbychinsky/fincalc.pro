import React, {FC} from 'react';
import TitleTile from "../titleTile/TitleTile";
import {GetDate} from "../../util/GetDate";
import {CiGlobe} from "react-icons/ci";
import {CurrencyListFullName, CurrencyListShortName} from "../../model/Currency";
import "./CurrencyRate.scss";

interface ICurrencyRate {
    amountUSD: number,
    amountEUR: number,
    amountRUB: number,
    amountPLN: number
}

const CurrencyRate: FC<ICurrencyRate> = ({
                                             amountUSD,
                                             amountPLN,
                                             amountRUB,
                                             amountEUR
                                         }) => {
    return (
        <div className="currencyRate">
            <TitleTile title={`Курсы на ${GetDate.dateSerialize(GetDate.convertDateToString(new Date()))}`}/>
            <a href="https://www.nbrb.by/statistics/rates/ratesdaily.asp"
               title="currency"
               target="_blank" rel="noreferrer"
               className="siteNBRB">
                <CiGlobe/>
            </a>
            <div className="value USD">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.USD}</span>
                        <span>{CurrencyListShortName.USD} - {CurrencyListShortName.BYN}</span>
                        <span></span>
                    </span>
                <span className="amount">{amountUSD}</span>

            </div>
            <div className="value EUR">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.EUR}</span>
                       <span>{CurrencyListShortName.EUR} - {CurrencyListShortName.BYN}</span>
                        <span></span>
                    </span>
                <span className="amount">{amountEUR} </span>
            </div>
            <div className="value RUB">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.RUB}</span>
                        <span>100 {CurrencyListShortName.RUB} - {CurrencyListShortName.BYN}</span>
                    </span>
                <span className="amount">{amountRUB}</span>
            </div>
            <div className="value PLN">
                <span className="icon"></span>
                <span className="currency">
                        <span>{CurrencyListFullName.PLN}</span>
                        <span>10 {CurrencyListShortName.PLN} - {CurrencyListShortName.BYN}</span>
                    </span>
                <span className="amount">{amountPLN}</span>
            </div>
        </div>
    );
};

export default CurrencyRate;