/**
 * Класс работы с датой
 */
export class GetDate {

    /**
     * Получаем вчерашнюю дату формата 2023-03-16
     */
    static getYesterdayDate(): string {
        const toDay: Date = new Date();
        toDay.setDate(toDay.getDate() - 1);
        return toDay.toISOString().slice(0, 10);
    }

    /**
     * Сериализуем дату в нужный формат для вывода DD.MM
     * 23.03
     * @param date
     */
    static dateSerialize(date: string): string {
        let result = date.slice(5, 10);
        result = `${result.slice(3, 5)}.${result.slice(0, 2)}`;
        return result
    }

    /**
     * Сериализуем дату в нужный формат для вывода DD
     * 23
     * @param date
     */
    static dateSerializeDD(date: string): string {
        let result = date.slice(5, 10);
        result = result.slice(3, 5);
        return result
    }

    /**
     * Сериализуем дату в нужный формат для вывода DD.MM.YY
     * 23.03
     * @param date
     */
    static dateSerializeDDMMYY(date: string): string {
        return date.replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`)
    }

    /**
     * Получаем завтрашнюю дату формата 2023-03-16
     */
    static getTomorrowDate(): string {
        const toDay: Date = new Date();
        toDay.setDate(toDay.getDate() + 1);
        return toDay.toISOString().slice(0, 10);
    }

    /**
     * Получение даты на N дней назад
     * от текущей
     */
    static getDatePeriod(countDay: number = 30): string {
        const toDay: Date = new Date();
        toDay.setDate(toDay.getDate() - countDay);
        return toDay.toISOString().slice(0, 10);
    }

    /**
     * Конвертируем дату для запроса
     */
    static convertDateToString(date: Date): string {
        return date.toISOString().slice(0, 10);
    }
}

