import React, {useState} from 'react';
import InputTextField from "../inputField/InputField";
import "react-datepicker/dist/react-datepicker.css";
import "./StatisticSection.scss";
import FormRow from "../formRow/FormRow";
import DateField from "../dateField/DateField";
import {CurrencyListShortName} from "../../model/Currency";
import TitleTile from "../titleTile/TitleTile";

type Amount = {
    total_amount: number,
    month_amount: number
}

type StatisticSectionProps = {
    currencyAmountToday: number | undefined
}

const TOTAL_AMOUNT: number = 27900;
const MONTH_AMOUNT: number = 775;

/**
 * Секция статистики
 * @param currencyAmountToday
 */
const StatisticSection = ({currencyAmountToday = 0}: StatisticSectionProps) => {
    const initialData: Amount = {total_amount: TOTAL_AMOUNT, month_amount: MONTH_AMOUNT};

    const [startDate, setDate] = useState(new Date('2021-11-10'));
    const [finishDate, setFinishDate] = useState(new Date());
    const [amount, setAmount] = useState<Amount>(initialData);

    const setAmountFromField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAmount({...amount, [e.target.name]: Number(e.target.value)});
    }

    /**
     * Расчет оплаченных месяцев
     * @param startDate
     * @param finishDate
     */
    const differenceInMonths = (startDate: Date, finishDate: Date): number => {
        const monthDiff = finishDate.getMonth() - startDate.getMonth();
        const yearDiff = finishDate.getFullYear() - startDate.getFullYear();
        return monthDiff + yearDiff * 12;
    }

    /**
     * Расчет выплаченноей суммы
     * Оплата за месяц * кол-во оплаченных месяцев
     */
    const calcPaid = (): number => {
        return amount.month_amount * differenceInMonths(startDate, finishDate)
    }

    /**
     * Расчет остатка
     * Общий долг - выплачено
     */
    const balance = (): number => {
        return amount.total_amount - calcPaid();
    }
    return (
        <div className="statisticSection">
            <TitleTile><span>Рассрочка по строительству</span></TitleTile>
            <FormRow label={"Общая сумма рассрочки (USD):"}
                     children={<InputTextField value={amount.total_amount.toString()}
                                               changeHandler={setAmountFromField}
                                               name="total_amount"
                                               type="number"/>}/>
            <FormRow label={"Ежемесячный платеж (USD):"}
                     children={<InputTextField value={amount.month_amount.toString()}
                                               changeHandler={setAmountFromField}
                                               name="month_amount"
                                               type="number"/>}/>
            <FormRow className="counter"
                     label={"Оплачено месяцев:"}
                     children={<div className="field">{differenceInMonths(startDate, finishDate)}</div>}/>
            <FormRow className="counter"
                     label="Выплачено:"
                     children={<>
                         <div className="positive">
                             <span className="field"> {calcPaid()}</span>
                             <span className="curr">{CurrencyListShortName.USD}</span>
                         </div>
                         <span className="separator">/</span>
                         <div className="positive">{
                             currencyAmountToday
                                 ? <span className="field"> {(calcPaid() * currencyAmountToday).toFixed(2)}</span>
                                 : <span className="field">{calcPaid()}</span>}
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>

                     </>}/>
            <FormRow className="counter"
                     label="Остаток:"
                     children={<>
                         <div className="negative">
                             <span className="field">{balance()}</span>
                             <span className="curr">{CurrencyListShortName.USD}</span>
                         </div>
                         <span className="separator">/</span>
                         <div className="negative">{
                             currencyAmountToday
                                 ? <span className="field">{(balance() * currencyAmountToday).toFixed(2)}</span>
                                 : <span className="field">{balance()}</span>}
                             <span className="curr">{CurrencyListShortName.BYN}</span>
                         </div>
                     </>}/>
            <FormRow className="date"
                     label="Дата первого платежа"
                     children={<DateField date={startDate} setDate={setDate}/>}
            />

            <FormRow className="date"
                     label="Дата текущего платежа"
                     children={<DateField date={finishDate} setDate={setFinishDate}/>}
            />
        </div>
    );
};

export default StatisticSection;