import {CurrencyRateStore} from "./CurrencyRateStore";
import {AreaChartStore} from "./AreaChartStore";
import {LoanStore} from "./LoanStore";
import {DepositStore} from "./DepositStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    currencyRateStore;
    areaChartStore;
    loanStore;
    depositStore;

    constructor() {
        this.currencyRateStore = new CurrencyRateStore();
        this.areaChartStore = new AreaChartStore();
        this.loanStore = new LoanStore();
        this.depositStore = new DepositStore();
    }
}