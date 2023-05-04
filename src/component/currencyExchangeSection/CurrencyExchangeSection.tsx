import React, {useContext} from 'react';
import FormRow from "../formRow/FormRow";
import "./CurrencyExchangeSection.scss";
import {CurrencyCombobox, CurrencyListFullName, CurrencyListShortName} from "../../model/Currency";
import {observer} from "mobx-react";
import {StoreContext} from "../../App";
import TitleTile from "../titleTile/TitleTile";
import ComboboxCurrencyField from "../comboboxCurrencyField/ComboboxCurrencyField";
import {CiRepeat} from "react-icons/ci";
import InputTextField from "../inputField/InputField";
import {GetDate} from "../../util/GetDate";

interface ICurrencyExchangeSection {
    actualDate: Date
}

/**
 * Компонент конвертации валюты
 */
const CurrencyExchangeSection = observer(({
                                              actualDate
                                          }: ICurrencyExchangeSection) => {

    const currencyRateStore = useContext(StoreContext).currencyRateStore;

    const getClassName = (value: string): boolean => {
        let result = false;
        if (value === currencyRateStore.calcAmount) {
            result = true;
        }
        return result
    }

    return (
        <div className="currencyExchangeSection">
            <TitleTile>
                <span>Конвертация на</span>
                <span
                    className="smallText">{GetDate.dateSerializeDDMMYY(GetDate.convertDateToString(actualDate))}</span>
            </TitleTile>
            <div className="top">
                <FormRow label={""}
                         className="currency"
                         children={
                             <ComboboxCurrencyField valueList={CurrencyCombobox}
                                                    actualStore={currencyRateStore}/>}
                />
                <FormRow label={""}
                         className="amount"
                         children={
                             <InputTextField
                                 value={currencyRateStore.calcAmount}
                                 changeHandler={currencyRateStore.changeHandlerValue}
                                 name="amountBYN"
                                 type="number"
                             />
                         }
                />
            </div>
            {currencyRateStore.calcAmount
                ? currencyRateStore.currencyListCalculated?.map((
                    {
                        byn,
                        eur,
                        usd,
                        rub,
                        pln
                    }, index) => (
                    <div key={index} className="bottom">
                        <span className="iconExchange"><CiRepeat/></span>
                        <div className={`result ${getClassName(byn.toString())
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.BYN}>{CurrencyListFullName.BYN}:</span>
                            <span>{byn.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(usd.toString())
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.USD}>{CurrencyListFullName.USD}:</span>
                            <span>{usd.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(eur.toString())
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.EUR}>{CurrencyListFullName.EUR}:</span>
                            <span>{eur.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(rub.toString())
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.RUB}>{CurrencyListFullName.RUB}:</span>
                            <span>{rub.toFixed(2)}</span>
                        </div>
                        <div className={`result ${getClassName(pln.toString())
                            ? "equal"
                            : ""}`}>
                            <span className={CurrencyListShortName.PLN}>{CurrencyListFullName.PLN}:</span>
                            <span>{pln.toFixed(2)}</span>
                        </div>
                    </div>
                ))
                : ''
            }
        </div>
    );
});

export default CurrencyExchangeSection;