/**
 * Ответ сервера на запрос курса валют
 * за период
 */
export class ResponseCurrencyPeriod {
    Cur_Abbreviation: string;
    Cur_ID: number;
    Cur_Name: string;
    Cur_OfficialRate: number;
    Cur_Scale: number;
    Date: string;
    Error_Message: string;

    constructor() {
        this.Cur_Abbreviation = "";
        this.Cur_ID = 0;
        this.Cur_Name = "";
        this.Cur_OfficialRate = 0;
        this.Cur_Scale = 0;
        this.Date = "";
        this.Error_Message = "";
    }
}