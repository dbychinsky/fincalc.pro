import {makeAutoObservable, runInAction} from "mobx";
import React from "react";
import {Deposit} from "../model/Deposit";
import {CurrencyListShortName} from "../model/Currency";


type DepositAmountList = {

    /**
     * Номер месяца
     */
    numberMonth: number,

    /**
     * Прибыль за месяц
     */
    profitMonth: number,

    /**
     * Сумма на депозите
     */
    depositAmount: number,
}

/**
 * Store для работы с deposits
 */
export class DepositStore {

    /**
     * Данные для расчета
     */
    public depositValuesEnter: Deposit = new Deposit();

    /**
     * Валюта для депозитов
     */
    public currencyValue: string = CurrencyListShortName.USD;

    /**
     * Список значений депозита по месяцам
     */
    public depositAmountList: DepositAmountList[] = [];

    /**
     * Общая сумма депозита с прибылью на конец периода
     */
    public depositAmountProfit: number = 0;

    /**
     * Общая сумма прибыли
     */
    public amountProfit: number = 0;

    /**
     * Метод получения значения из select
     */
    public changeHandlerCurrencyHandle(value: string) {
        runInAction(() => {
            this.currencyValue = value;
        });
    }

    //
    // public changeHandlerCurrency(e: ChangeEvent<HTMLSelectElement>) {
    //     runInAction(() => {
    //         this.currencyValue = e.target.value;
    //     });
    // }

    constructor() {
        makeAutoObservable(this);
        this.handleChange = this.handleChange.bind(this);
        this.calculation = this.calculation.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        runInAction(() => {
            this.depositValuesEnter = {
                ...this.depositValuesEnter, [e.target.name]: e.target.value
            }
        });
    };

    /**
     * Расчет прибыли по депозиту
     */
    public calculation() {
        const countMonth = Number(this.depositValuesEnter.countMonth);
        let depositAmount: number = this.depositValuesEnter.depositAmount;

        /**
         * Локльный список значений депозита по месяцам
         */
        const depositAmountListLocal: DepositAmountList[] = [];

        /**
         * Ежемесячный доход
         */
        let profitMonth: number = 0

        for (let i = 1; i <= countMonth; i++) {
            profitMonth = Number(this.calcProfitMonth(depositAmount))
            depositAmount = Number(depositAmount) + profitMonth;
            depositAmountListLocal.push({numberMonth: i, profitMonth: profitMonth, depositAmount: depositAmount});
        }

        runInAction(() => {
            this.depositAmountList = depositAmountListLocal;
        })

        runInAction(() => {
                const resultDeposit = depositAmountListLocal.find((elem) => elem.numberMonth === countMonth)?.depositAmount;
                const resultProfit = depositAmountListLocal.find((elem) => elem.numberMonth === countMonth)?.profitMonth;
                if (resultDeposit !== undefined && resultProfit !== undefined) {
                    this.depositAmountProfit = resultDeposit
                    this.amountProfit = resultProfit
                }
            }
        )
    }

    /**
     * Расчет прибыли в месяц
     * @private
     * Прибыль за месяц = Сумма вклада × Годовой процент / 365 дней × Количество дней в месяце
     * 1-я капитализация: 200.00 + ( 200.00 * 11.55 * 31 ) / (365 * 100) = 201,96 BYN
     * 2-я капитализация: 201.96 + ( 201.96 * 11.55 * 30 ) / (365 * 100) = 203,88 BYN
     */
    private calcProfitMonth(amount: number): number {
        let result = 0;
        result = (amount * this.depositValuesEnter.percent * 30) / (365 * 100);
        return result;
    }
}