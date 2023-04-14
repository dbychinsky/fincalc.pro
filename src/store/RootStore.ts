import {CurrencyRateStore} from "./CurrencyRateStore";
import {AreaChartStore} from "./AreaChartStore";
import {LoanStore} from "./LoanStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    currencyRateStore;
    areaChartStore;
    loanStore;

    constructor() {
        this.currencyRateStore = new CurrencyRateStore();
        this.areaChartStore = new AreaChartStore();
        this.loanStore = new LoanStore();
    }
}