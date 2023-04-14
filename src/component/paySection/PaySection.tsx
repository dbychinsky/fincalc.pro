import React from 'react';
import "./PaySection.scss"
import FormRow from "../formRow/FormRow";
import {CurrencyListShortName} from "../../model/Currency";

type PaySectionProps = {
    currencyAmountToday: number | undefined,
    currencyAmountTomorrow: number | undefined
}

/**
 * Секция расчета платежа для месяца
 * @param currencyAmountToday
 * @param currencyAmountYesterday
 */
const PaySection = ({currencyAmountToday = 0, currencyAmountTomorrow = 0}: PaySectionProps) => {
    const PAY_ONE = 556;
    const PAY_TWO = 219;
    const amountTodayOne: number = currencyAmountToday * PAY_ONE;
    const amountTodayTwo: number = currencyAmountToday * PAY_TWO;
    const amountYesterdayOne: number = currencyAmountTomorrow * PAY_ONE;
    const amountYesterdayTwo: number = currencyAmountTomorrow * PAY_TWO;

    return (
        <div className="paySection">
            <FormRow label="Оплата по курсу сегодня"
                     children={<>

                         <div className="neutral">
                             <span className="field"> {amountTodayOne.toFixed(2)}</span>
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>
                         <span className="separator">/</span>
                         <div className="neutral">
                             <span className="field"> {amountTodayTwo.toFixed(2)}</span>
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>
                     </>}
            />

            <FormRow label="Оплата по курсу завтра"
                     children={<>

                         <div className="neutral">
                             <span className="field"> {amountYesterdayOne.toFixed(2)}</span>
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>
                         <span className="separator">/</span>
                         <div className="neutral">
                             <span className="field"> {amountYesterdayTwo.toFixed(2)}</span>
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>
                     </>}
            />
        </div>
    );
};

export default PaySection;