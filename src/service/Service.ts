import {IService} from "./IService";
import axios from "axios";
import {ResponseCurrencyPeriod} from "../model/ResponseCurrencyPeriod";
import {CurrencyCode} from "../model/Currency";
import {GetDate} from "../util/GetDate";

/**
 * Список URL валют
 */
const enum backendServerUrl {
    RATES = `https://www.nbrb.by/api/exrates/rates`,
    URL_PERIOD = "https://www.nbrb.by/api/exrates/rates/dynamics",
    USD_FAKE = "http://localhost:3001/rate",
}

export class Server implements IService {

    /**
     * Получение курса USD на сегодня
     */
    getCurrencyDay(date: string, cur_id: number): Promise<ResponseCurrencyPeriod> {
        if (date) {
            return axios.get(`${backendServerUrl.RATES}/${cur_id}?ondate=${date}`)
                .then(response => response.data)
                .catch(err => {
                    if (err.response) {
                        console.log("client received an error response (5xx, 4xx)")
                    } else if (err.request) {
                        console.log("client never received a response, or request never left")

                    } else {
                        console.log("anything else")
                    }
                })
        } else {
            return axios.get(`${backendServerUrl.RATES}/${cur_id}`)
                .then(response => response.data)
                .catch(err => {
                    if (err.response) {
                        console.log("client received an error response (5xx, 4xx)")
                    } else if (err.request) {
                        console.log("client never received a response, or request never left")

                    } else {
                        console.log("anything else")
                    }
                })
        }
    };

    /**
     * Получение курса валют за период
     */
    getCurrencyPeriod(startDate: string,
                      endDate: string,
                      cur_id: number = CurrencyCode.USD): Promise<[ResponseCurrencyPeriod]> {
        return axios.get(`${backendServerUrl.URL_PERIOD}/${cur_id}/?startDate=${startDate}&endDate=${endDate}`)
            .then(response => response.data)
    }

    /**
     * Работа с локальным сервером
     */
    getLocalServerData(): Promise<[ResponseCurrencyPeriod]> {
        return axios.get(`${backendServerUrl.USD_FAKE}`)
            .then(response => response.data)
    }
}

