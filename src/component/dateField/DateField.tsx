import React, {FC} from 'react';
import "./DateField.scss";
import ru from 'date-fns/locale/ru';
import DatePicker, {registerLocale} from "react-datepicker";

interface IDateField {
    date: Date,
    setDate: (value: Date) => void
}

const DateField: FC<IDateField> = ({date, setDate}) => {
    registerLocale('ru', ru)
    return (
        <div className="dateField">
            <DatePicker
                selected={date}
                onChange={(date: Date) => setDate(date)}
                dateFormat="dd.MM.yyyy"
                locale="ru"/>
        </div>
    );
};

export default DateField;