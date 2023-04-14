import {makeAutoObservable, runInAction} from "mobx";
import React, {ChangeEvent} from "react";
import {CurrencyCode, CurrencyListShortName} from "../model/Currency";
import {server} from "../App";
import {GetDate} from "../util/GetDate";
import {ResponseCurrencyPeriod} from "../model/ResponseCurrencyPeriod";

type CalcResult = {
    usd: number,
    eur: number,
    rub: number,
    byn: number,
    pln: number
}

/**
 * Store для работы с currencyRate
 */
export class CurrencyRateStore {

    public amountUSD: number = 0;
    public amountEUR: number = 0;
    public amountRUB: number = 0;
    public amountPLN: number = 0;

    public calcAmount: string = '';
    public currencyValue: string = CurrencyListShortName.USD;
    public currencyListResult: CalcResult[] = [];

    public rateDynamicUSD: ResponseCurrencyPeriod[] = [];
    public rateDynamicEUR: ResponseCurrencyPeriod[] = [];
    public rateDynamicRUB: ResponseCurrencyPeriod[] = [];
    public rateDynamicPLN: ResponseCurrencyPeriod[] = [];


    constructor() {
        makeAutoObservable(this);
        this.changeHandlerValue = this.changeHandlerValue.bind(this);
        this.changeHandlerCurrency = this.changeHandlerCurrency.bind(this);
        this.convertCurrency = this.convertCurrency.bind(this);
    }

    public changeHandlerValue(e: React.ChangeEvent<HTMLInputElement>) {
        runInAction(() => {
            this.calcAmount = e.target.value;
        });
        this.convertCurrency();
    }

    public changeHandlerCurrency(e: ChangeEvent<HTMLSelectElement>) {
        runInAction(() => {
            this.currencyValue = e.target.value;
        });
        this.convertCurrency();
    }

    public changeHandlerCurrencyHandle(value: string) {
        runInAction(() => {
            this.currencyValue = value;
        });
        this.convertCurrency();
    }

    /**
     * Конвертация валют
     */
    public convertCurrency() {
        switch (this.currencyValue) {
            case CurrencyListShortName.USD:
                this.currencyListResult = this.convertCurrencyUSD();

                break;
            case CurrencyListShortName.BYN:
                this.currencyListResult = this.convertCurrencyBYN();
                break;
            case CurrencyListShortName.EUR:
                this.currencyListResult = this.convertCurrencyEUR();
                break;
            case CurrencyListShortName.RUB:
                this.currencyListResult = this.convertCurrencyRUB();
                break;
            case CurrencyListShortName.PLN:
                this.currencyListResult = this.convertCurrencyPLN();
                break;
        }
    }

    /**
     * Конвертация валют при основной валюте usd
     */
    private convertCurrencyUSD(): CalcResult[] {
        let currencyListLocal: CalcResult[] = [];
        currencyListLocal.push({
            byn: Number(this.calcAmount) * this.amountUSD,
            usd: Number(this.calcAmount),
            eur: (Number(this.calcAmount) * this.amountUSD) / this.amountEUR,
            rub: (Number(this.calcAmount) * this.amountUSD) * (100 / this.amountRUB),
            pln: (Number(this.calcAmount) * this.amountUSD) * (10 / this.amountPLN)
        });

        return currencyListLocal
    }

    /**
     * Конвертация валют при основной валюте byn
     */
    private convertCurrencyBYN(): CalcResult[] {
        let currencyListLocal: CalcResult[] = [];
        currencyListLocal.push({
            byn: Number(this.calcAmount),
            usd: Number(this.calcAmount) / this.amountUSD,
            eur: Number(this.calcAmount) / this.amountEUR,
            rub: Number(this.calcAmount) * (100 / this.amountRUB),
            pln: Number(this.calcAmount) * (10 / this.amountPLN)
        });

        return currencyListLocal
    }

    /**
     * Конвертация валют при основной валюте eur
     */
    private convertCurrencyEUR(): CalcResult[] {
        let currencyListLocal: CalcResult[] = [];
        currencyListLocal.push({
            byn: Number(this.calcAmount) * this.amountEUR,
            usd: (Number(this.calcAmount) * this.amountEUR) / this.amountUSD,
            eur: Number(this.calcAmount),
            rub: (Number(this.calcAmount) * this.amountEUR) * (100 / this.amountRUB),
            pln: (Number(this.calcAmount) * this.amountEUR) * (10 / this.amountPLN)
        });

        return currencyListLocal
    }

    /**
     * Конвертация валют при основной валюте rub
     */
    private convertCurrencyRUB(): CalcResult[] {
        let currencyListLocal: CalcResult[] = [];

        currencyListLocal.push({
            byn: Number(this.calcAmount) / (100 / this.amountRUB),
            usd: (Number(this.calcAmount) / (100 / this.amountRUB)) / this.amountUSD,
            eur: (Number(this.calcAmount) / (100 / this.amountRUB)) / this.amountEUR,
            rub: Number(this.calcAmount),
            pln: (Number(this.calcAmount) / (100 / this.amountRUB)) / (this.amountPLN / 10),
        });

        return currencyListLocal
    }

    /**
     * Конвертация валют при основной валюте PLN
     */
    private convertCurrencyPLN(): CalcResult[] {
        let currencyListLocal: CalcResult[] = [];
        currencyListLocal.push({
            byn: (this.amountPLN / 10) * Number(this.calcAmount),
            usd: (this.amountPLN / 10) * Number(this.calcAmount) / this.amountUSD,
            eur: (this.amountPLN / 10) * Number(this.calcAmount) / this.amountEUR,
            rub: (this.amountPLN / 10) * Number(this.calcAmount) * (100 / this.amountRUB),
            pln: Number(this.calcAmount)
        });

        return currencyListLocal
    }

    /**
     * Получаем курсы валют на сегодня
     */
    public getCurrencyDay() {
        server.getCurrencyDay(GetDate.convertDateToString(new Date()), CurrencyCode.USD)
            .then((currency) =>
                runInAction(() => {
                    this.amountUSD = currency.Cur_OfficialRate
                })
            );
        server.getCurrencyDay(GetDate.convertDateToString(new Date()), CurrencyCode.EUR)
            .then((currency) =>
                runInAction(() => {
                    this.amountEUR = currency.Cur_OfficialRate
                }));
        server.getCurrencyDay(GetDate.convertDateToString(new Date()), CurrencyCode.RUB)
            .then((currency) =>
                runInAction(() => {
                    this.amountRUB = currency.Cur_OfficialRate
                }));
        server.getCurrencyDay(GetDate.convertDateToString(new Date()), CurrencyCode.PLN)
            .then((currency) =>
                runInAction(() => {
                    this.amountPLN = currency.Cur_OfficialRate
                }));
    }

    /**
     * Получаем данные за период
     */
    public getCurrencyPeriod() {
        server.getCurrencyPeriod(GetDate.getDatePeriod(90), GetDate.convertDateToString(new Date()), CurrencyCode.USD)
            .then((response =>
                runInAction(() => {
                    this.rateDynamicUSD = response
                })));
        server.getCurrencyPeriod(GetDate.getDatePeriod(90), GetDate.convertDateToString(new Date()), CurrencyCode.EUR)
            .then((response =>
                runInAction(() => {
                    this.rateDynamicEUR = response
                })));
        server.getCurrencyPeriod(GetDate.getDatePeriod(90), GetDate.convertDateToString(new Date()), CurrencyCode.RUB)
            .then((response =>
                runInAction(() => {
                    this.rateDynamicRUB = response
                })));
        server.getCurrencyPeriod(GetDate.getDatePeriod(90), GetDate.convertDateToString(new Date()), CurrencyCode.PLN)
            .then((response =>
                runInAction(() => {
                    this.rateDynamicPLN = response
                })))
    }

    /**
     * Метод для разделения курса Российского рубля.
     * Курс приходит за 100 рублей.
     * @param array Ответ серевера по RUB
     * @return array Данные с курсом поделенным на 100
     */
    private getOneRUB(array: ResponseCurrencyPeriod[]): ResponseCurrencyPeriod[] {
        let newArray: ResponseCurrencyPeriod[] = array.map((elem) => {
            return {...elem, Cur_OfficialRate: elem.Cur_OfficialRate / 10}
        })
        return newArray
    }

    /**
     * Метод для разделения курса Полського злотого.
     * Курс приходит за 10 злотых.
     * @param array Ответ серевера по PLN
     * @return array Данные с курсом поделенным на 10
     */
    private getOnePLN(array: ResponseCurrencyPeriod[]): ResponseCurrencyPeriod[] {
        let newArray: ResponseCurrencyPeriod[] = array.map((elem) => {
            return {...elem, Cur_OfficialRate: elem.Cur_OfficialRate / 10}
        })
        return newArray
    }
}
