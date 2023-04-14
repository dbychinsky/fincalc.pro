import React, {useEffect, useState} from 'react';
import "./RateSection.scss";
import {GetDate} from "../../util/GetDate";
import {server} from "../../App";
import {ResponseCurrencyPeriod} from "../../model/ResponseCurrencyPeriod";
import {ErrorText} from "../../validate/errorText";

type ICurOfficialRateList = {
    date: string,
    rate: number,
    description: string
}

/**
 * Компонент отображения краткого курса валют за 3 дня
 */
const RateSection = () => {

    /**
     * Данные с сервера
     */
    const [rateList, setRateList] = useState<ResponseCurrencyPeriod[]>([new ResponseCurrencyPeriod()]);

    /**
     * Сериализованные данные с сервера для отображения
     */
    const [newRateList, setNewRateList] = useState<ICurOfficialRateList[]>([]);

    /**
     * Получаем данные за период
     */
    useEffect(() => {
        server.getCurrencyPeriod(GetDate.getYesterdayDate(), GetDate.getTomorrowDate())
            .then((response) => setRateList(response))
        // server.getLocalServerData()
        //     .then((response) => setRateList(response))
    }, []);

    /**
     * Помещаем новый список валют в состояние
     */
    useEffect(() => {
        setNewRateList(createNewRateList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateList]);


    /**
     * Создание нового (сериализованного) массива валют
     */
    const createNewRateList = (): ICurOfficialRateList[] => {
        const newRateListLocal: ICurOfficialRateList[] = []
        let comparisonRateStandard: number = rateList[0].Cur_OfficialRate;

        rateList.forEach(({Date, Cur_OfficialRate}) => {
            newRateListLocal.push({
                date: GetDate.dateSerializeDD(Date),
                rate: Cur_OfficialRate,
                description: compare(Cur_OfficialRate)
            });
        });

        /**
         * Метод сравнения курсов валют
         */
        function compare(Cur_OfficialRate: number): string {
            let result: string = "noChange";
            if (Cur_OfficialRate !== comparisonRateStandard) {
                if (Cur_OfficialRate > comparisonRateStandard) {
                    result = "rateToTop"
                } else {
                    result = "rateToBottom"
                }
            }
            comparisonRateStandard = Cur_OfficialRate;
            return result
        }

        return newRateListLocal
    }

    return (
        <div className="rateSection">
            <ul>
                {newRateList.length > 1
                    ? newRateList.map(({date, rate, description}) => (
                        <li key={date} className={`rateRow ${description}`}>
                            <span className="date">{date}</span>
                            <span className="separate">-</span>
                            <span className="rate">
                        {rate.toFixed(4)}
                    </span>
                        </li>
                    ))
                    : <div className="errorText">{ErrorText.NO_SERVER_CONNECT}</div>
                }
            </ul>
        </div>
    );
};

export default RateSection;