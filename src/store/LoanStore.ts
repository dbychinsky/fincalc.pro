import {makeAutoObservable, runInAction} from "mobx";
import React, {ChangeEvent} from "react";
import {Loan} from "../model/Loan";
import {CurrencyListShortName} from "../model/Currency";

type LoanValuesViewDifferent = {

    /**
     * номер месяца
     */
    numberMonth: number;

    /**
     * остаток
     */
    balance: number;

    /**
     * ежемесячный платеж
     */
    payMonth: number;

    /**
     * ежемесячный платеж - проценты
     */
    payMonthPercents: number;

    /**
     * ежемесячный платеж - проценты
     */
    mainDebt: number;
}


/**
 * Store для работы с LoanStore
 */
export class LoanStore {

    /**
     * Аннуитетный кредит
     */
    public loanValuesViewAnnuity: Loan = new Loan();

    /**
     * Дифференцируемый кредит
     */
    public loanValuesViewDifferent: LoanValuesViewDifferent[] = [];

    /**
     * Валюта для кредитов
     */
    public currencyValue: string = CurrencyListShortName.USD;


    /**
     * ВВодимые данные
     */
    public loanValuesEnter: Loan = new Loan();

    constructor() {
        makeAutoObservable(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        runInAction(() => {
            this.loanValuesEnter = {
                ...this.loanValuesEnter, [e.target.name]: e.target.value
            }
        });
    };


    public changeHandlerCurrency(e: ChangeEvent<HTMLSelectElement>) {
        runInAction(() => {
            this.currencyValue = e.target.value;
        });
    }

    /**
     * Метод получения значения из select
     */
    public changeHandlerCurrencyHandle(value: string) {
        runInAction(() => {
            this.currencyValue = value;
        });
    }

    /**
     * Расчет платежей по аннуитетному принципу
     */
    calculateLoanAnnuity() {

        /**
         * Общая кредитуемая сумма
         */
        const loanAmount = this.loanValuesEnter.fullAmount;

        /**
         * Количество месяцев по кредиту
         */
        const countMonth = this.loanValuesEnter.countMonth;

        /**
         * Процентная ставка за месяц
         */
        const percentMonth = this.loanValuesEnter.percent / 12 / 100;

        /**
         * Общая сумма с процентами
         */
        const payMonth = (percentMonth * (Math.pow(1 + percentMonth, countMonth))) / (Math.pow(1 + percentMonth, countMonth) - 1) * loanAmount;

        /**
         * Общая сумма с процентами
         */
        const loanAmountPercent = payMonth * countMonth;

        /**
         * Переплата
         */
        const overpayment = loanAmountPercent - loanAmount;

        runInAction(() => {
            this.loanValuesViewAnnuity = {
                ...this.loanValuesViewAnnuity,
                overpayment: overpayment,
                loanAmountPercent: loanAmountPercent,
                paymentMonth: payMonth
            }
        });
    }

    /**
     * Расчет платежей по дифференцируемому принципу
     */
    calculateLoanDifferent() {

        /**
         * Общая кредитуемая сумма
         */
        let loanAmount = this.loanValuesEnter.fullAmount;

        /**
         * Количество месяцев по кредиту
         */
        const countMonth = this.loanValuesEnter.countMonth;


        let localLoanValuesViewDifferent: LoanValuesViewDifferent[] = [];

        /**
         * Ежемесячный платеж
         */
        const payMonth = loanAmount / countMonth;

        /**
         * Процентная ставка за месяц
         */
        const percentMonth = this.loanValuesEnter.percent / 100;

        for (let i = 1; i <= countMonth; i++) {
            if (i === 1) {
                localLoanValuesViewDifferent.push({
                    numberMonth: i,
                    balance: loanAmount,
                    payMonth: (loanAmount * percentMonth / 365 * 30) + payMonth,
                    payMonthPercents: (loanAmount * percentMonth / 365 * 30),
                    mainDebt: payMonth
                })
            } else {
                loanAmount = loanAmount - payMonth;
                localLoanValuesViewDifferent.push({
                    numberMonth: i,
                    balance: loanAmount,
                    payMonth: (loanAmount * percentMonth / 365 * 30) + payMonth,
                    payMonthPercents: (loanAmount * percentMonth / 365 * 30),
                    mainDebt: payMonth
                })
            }
        }

        runInAction(() => {
            this.loanValuesViewDifferent = localLoanValuesViewDifferent
        });
    }

}