import React, {FC, ReactElement} from 'react';
import Label from "../label/Label";
import "./FormRow.scss";

/**
 * Интерфейс
 */
interface IFormRow {

    /**
     * Имя доп класса
     */
    className?: string,

    /**
     * Лейбл
     */
    label: string,

    /**
     * Поле
     */
    children: ReactElement
}

const FormRow: FC<IFormRow> = ({className = '', label, children}) => {
    return (
        <div className={`formRow ${className}`}>
            <Label text={label}/>
            {children}
        </div>
    );
};

export default FormRow;