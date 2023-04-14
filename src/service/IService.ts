import {ResponseCurrencyPeriod} from "../model/ResponseCurrencyPeriod";

export interface IService {

    /**
     * Получение курса валют на сегодня
     */
    getCurrencyDay(date: string, cur_id: number): Promise<{}>;

    /**
     * Получение курса валют на период
     */
    getCurrencyPeriod(startDate: string, endDate: string, cur_id: number): Promise<[ResponseCurrencyPeriod]>;
}