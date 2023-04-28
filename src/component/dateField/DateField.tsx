import React, {FC} from 'react';
import "./DateField.scss";
import DatePicker from "react-datepicker";

interface IDateField {
    date: Date,
    setDate: (value: Date) => void
}

const DateField: FC<IDateField> = ({date, setDate}) => {
    return (
        <div className="dateField">
            <DatePicker
                selected={date}
                onChange={(date: Date) => setDate(date)}
                dateFormat="dd.MM.yyyy"/>
        </div>
    );
};

export default DateField;