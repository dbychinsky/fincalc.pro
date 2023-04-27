import React, {useContext, useEffect, useState} from 'react';
import "./LoanViewDate.scss";
import TabsLoan from "../tabsLoan/TabsLoan";
import {BiExpandVertical} from "react-icons/bi";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {ErrorText} from "../../validate/errorText";

/**
 * Компонент вывода результатов подсчета кредита
 * @param loanValues
 */
const LoanViewData = observer(() => {

    const loanStore = useContext(StoreContext).loanStore;

    useEffect(() => {
        loanStore.calculateLoanAnnuity();
        loanStore.calculateLoanDifferent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loanStore.loanValuesEnter]);

    const [isOpenTable, setIsOpenTable] = useState<boolean>(true);

    const showFullTable = () => {
        setIsOpenTable(!isOpenTable);
    }

    return (
        <div className="loanViewData">

            {Number.isNaN(loanStore.loanValuesViewAnnuity?.loanAmountPercent)
                ? <div className="errorText">{ErrorText.EMPTY_FIELDS}</div>
                : <TabsLoan titleFirst={"Аннуитетный"}
                            tabFirst={
                                <div className="annuity">
                                    <div className="static">
                                        <div>
                                            <span className="title">Ежемесячный платеж:</span>
                                            <span
                                                className="value">{loanStore.loanValuesViewAnnuity?.paymentMonth.toFixed(2)}</span>
                                            <span className="currency">{loanStore.currencyValue}</span>
                                        </div>
                                        <div>
                                            <span className="title">Переплата:</span>
                                            <span
                                                className="value">{loanStore.loanValuesViewAnnuity?.overpayment.toFixed(2)}</span>
                                            <span className="currency">{loanStore.currencyValue}</span>
                                        </div>
                                        <div>
                                            <span className="title">Общая сумма выплат:</span>
                                            <span
                                                className="value">{loanStore.loanValuesViewAnnuity?.loanAmountPercent.toFixed(2)}</span>
                                            <span className="currency">{loanStore.currencyValue}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            titleSecond={"Дифференцированный"}
                            tabSecond={
                                <div className="differ">
                                    <p className="title"><span>Месяц равен 30 дням</span></p>
                                    <button className={`buttonOpen  ${isOpenTable ? 'close' : 'open'}`}
                                            onClick={showFullTable}><BiExpandVertical/>
                                    </button>


                                    <div className="table">
                                        <div className="headerTable">
                                            <span className="tableCell month">Месяц</span>
                                            <span className="tableCell percent">Процент</span>
                                            <span className="tableCell loan">Долг</span>
                                            <span className="tableCell payment">Платеж</span>
                                        </div>

                                        <div className={`tableBody ${isOpenTable ? 'close' : 'open'}`}>

                                            {loanStore.loanValuesViewDifferent.map((calc) => (
                                                <div className="tableRow" key={calc.numberMonth}>
                                                    <span className="tableCell month">{calc.numberMonth}</span>
                                                    <span
                                                        className="tableCell percent">{calc.payMonthPercents.toFixed(2)}</span>
                                                    <span className="tableCell loan">{calc.mainDebt.toFixed(2)}</span>
                                                    <span
                                                        className="tableCell payment">{calc.payMonth.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }/>}
            <p className="description"><span>*</span>Расчет приблизительный</p>
        </div>
    );
});

export default LoanViewData;