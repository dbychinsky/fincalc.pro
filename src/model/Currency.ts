/**
 * Список валют
 */
export enum CurrencyListFullName {
    BYN = "Белорусский рубль",
    USD = "Доллар США",
    EUR = "Евро",
    RUB = "Российский рубль",
    PLN = "Польский злотый"
}

export enum CurrencyListShortName {
    BYN = "BYN",
    USD = "USD",
    EUR = "EUR",
    RUB = "RUB",
    PLN = "PLN"
}

export enum CurrencyCode {
    BYN = 0,
    USD = 431,
    EUR = 451,
    RUB = 456,
    PLN = 452
}

/**
 * Массив возможных значений валют
 */
export const CurrencyCombobox = [
    {id: CurrencyListShortName.USD, value: CurrencyListShortName.USD},
    {id: CurrencyListShortName.EUR, value: CurrencyListShortName.EUR},
    {id: CurrencyListShortName.BYN, value: CurrencyListShortName.BYN},
    {id: CurrencyListShortName.RUB, value: CurrencyListShortName.RUB},
    {id: CurrencyListShortName.PLN, value: CurrencyListShortName.PLN}
];

/**
 * Валюта
 */
export class Loan {

    /**
     * Код валюты по нацбанку РБ
     */
    code: number;

    /**
     * Наименование
     */
    currency: string;

    /**
     * Краткое наименование
     */
    shortname: string;

    constructor() {
        this.code = 0;
        this.currency = CurrencyListFullName.BYN;
        this.shortname = CurrencyListShortName.BYN;
    }
}