/**
 * Кредит
 */
export class Deposit {

    /**
     * Полная сумма депозита
     */
    depositAmount: number;

    /**
     * Валюта депозита
     */
    currency: string;

    /**
     * Процент по депозиту
     */
    percent: number;

    /**
     * Количество месяцев
     */
    countMonth: number;

    constructor() {
        this.depositAmount = 0;
        this.currency = "";
        this.percent = 0;
        this.countMonth = 0;
    }
}