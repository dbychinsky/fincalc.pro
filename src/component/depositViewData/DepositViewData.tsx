import React, {useContext, useEffect} from 'react';
import "./DepositViewData.scss";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import {ErrorText} from "../../validate/errorText";

const DepositViewData = observer(() => {

    const depositStore = useContext(StoreContext).depositStore;

    useEffect(() => {
        depositStore.calculation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositStore.depositValuesEnter]);

    return (
        <div className="depositViewData">
            <div className="annuity">
                <div className="static">
                    <div>
                        <span className="title">Депозит:</span>
                        <span className="value">{depositStore.depositAmountProfit.toFixed(2)}</span>
                        <span className="currency">{depositStore.currencyValue}</span>
                    </div>
                    <div>
                        <span className="title">Прибыль:</span>
                        <span className="value">{depositStore.amountProfit.toFixed(2)}</span>
                        <span className="currency">{depositStore.currencyValue}</span>
                    </div>

                </div>
            </div>

            {depositStore.amountProfit ?
                <>
                    <div className="tableHead">
                        <div className="tableCell month">Месяц</div>
                        <div className="tableCell profitMonth">Прибыль</div>
                        <div className="tableCell depositAmount">Сумма депозита</div>
                    </div>

                    {
                        depositStore.depositAmountList.map((row) => (
                            <div key={row.numberMonth} className="tableBody">
                                <div className="tableCell month">{row.numberMonth}</div>
                                <div className="tableCell profitMonth">{row.profitMonth.toFixed(1)}</div>
                                <div className="tableCell depositAmount">{row.depositAmount.toFixed(1)}</div>
                            </div>
                        ))
                    }
                </>
                : <div className="errorText">{ErrorText.EMPTY_FIELDS}</div>
            }
        </div>
    );
});

export default DepositViewData;