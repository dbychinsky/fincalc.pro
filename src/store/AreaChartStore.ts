import {makeAutoObservable, runInAction} from "mobx";
import {ResponseCurrencyPeriod} from "../model/ResponseCurrencyPeriod";
import {GetDate} from "../util/GetDate";
import {RateDynamicChart} from "../component/charts/AreaChartComponent";

/**
 * Store для работы с areaChart
 */
export class AreaChartStore {

    public rateDynamic: RateDynamicChart[] = [];
    public rateAllPeriodChart: RateDynamicChart[] = this.rateDynamic.slice();

    constructor() {
        makeAutoObservable(this);
    }

    public setRateDynamic(rateDynamicUSD: ResponseCurrencyPeriod[],
                          rateDynamicEUR: ResponseCurrencyPeriod[],
                          rateDynamicRUB: ResponseCurrencyPeriod[],
                          rateDynamicPLN: ResponseCurrencyPeriod[]) {
        runInAction(() => {
            this.rateAllPeriodChart = this.convertToChartMonth(rateDynamicUSD,
                rateDynamicEUR,
                rateDynamicRUB,
                rateDynamicPLN);
        })
    }

    /**
     * Преобразуем полученные данные для графика за месяц
     */
    public convertToChartMonth(
        rateDynamicUSD: ResponseCurrencyPeriod[],
        rateDynamicEUR: ResponseCurrencyPeriod[],
        rateDynamicRUB: ResponseCurrencyPeriod[],
        rateDynamicPLN: ResponseCurrencyPeriod[]): RateDynamicChart[] {
        const rateDynamicChartLocal: RateDynamicChart[] = []
        rateDynamicUSD.forEach(({Date, Cur_OfficialRate}) => {

            rateDynamicChartLocal.push({
                day: GetDate.dateSerialize(Date),
                USD: Cur_OfficialRate,
                EUR: this.getRate(rateDynamicEUR, Date),
                RUB: this.getRate(rateDynamicRUB, Date),
                PLN: this.getRate(rateDynamicPLN, Date)
            });
        });
        return rateDynamicChartLocal
    }


    /**
     * Получение курса для конвертации в динамике
     * @param rateDynamic
     * @param date
     */
    private getRate(rateDynamic: ResponseCurrencyPeriod[], date: string): number {
        let result: number | undefined = 0;
        result = rateDynamic?.find(elem => elem.Date === date)?.Cur_OfficialRate;

        if (result !== undefined) {
            return result
        } else return 0

    }

}

