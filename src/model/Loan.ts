/**
 * Кредит
 */
export class Loan {

    /**
     * Полная сумма кредита
     */
    fullAmount: number;

    /**
     * Валюта кредита
     */
    currency: string;

    /**
     * Процент по кредиту
     */
    percent: number;

    /**
     * Количество месяцев
     */
    countMonth: number;

    /**
     * Ежемесячный платеж
     */
    paymentMonth: number;

    /**
     * Переплата
     */
    overpayment: number;

    /**
     * Общая сумма выплаты
     */
    loanAmountPercent: number;

    constructor() {
        this.fullAmount = 0;
        this.currency = "";
        this.percent = 0;
        this.countMonth = 0;
        this.paymentMonth = 0;
        this.overpayment = 0;
        this.loanAmountPercent = 0;
    }
}