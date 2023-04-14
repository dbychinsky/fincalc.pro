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
                                            <span>Ежемесячный платеж:</span>
                                            <span>{loanStore.loanValuesViewAnnuity?.paymentMonth.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span>Переплата:</span>
                                            <span>{loanStore.loanValuesViewAnnuity?.overpayment.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span>Общая сумма выплат:</span>
                                            <span>{loanStore.loanValuesViewAnnuity?.loanAmountPercent.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            titleSecond={"Дифференцированный"}
                            tabSecond={
                                <div className="differ">
                                    <p className="title"><span>Месяц равен 30 дням</span></p>
                                    <button className="buttonOpen" onClick={showFullTable}><BiExpandVertical/></button>


                                    <div className="table">
                                        <div className="headerTable">
                                            <span className="tableCell">Месяц</span>
                                            <span className="tableCell">Процент</span>
                                            <span className="tableCell">Долг</span>
                                            <span className="tableCell">Платеж</span>
                                        </div>

                                        <div className={`tableBody ${isOpenTable ? 'close' : 'open'}`}>

                                            {loanStore.loanValuesViewDifferent.map((calc) => (
                                                <div className="tableRow" key={calc.numberMonth}>
                                                    <span className="tableCell">{calc.numberMonth}</span>
                                                    <span
                                                        className="tableCell">{calc.payMonthPercents.toFixed(2)}</span>
                                                    <span className="tableCell">{calc.mainDebt.toFixed(2)}</span>
                                                    <span className="tableCell">{calc.payMonth.toFixed(2)}</span>
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