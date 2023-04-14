import React, {ChangeEvent, FC} from 'react';
import './Combobox.scss';

/**
 * Компонент Combobox
 */
type IComboboxFieldProps = {

    /**
     * Метод, вызывающийся при изменении поля
     *
     * @param event выбранное значение
     */
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,

    /**
     * Возможные значения
     */
    valueList: { id: string, value: string }[],

    /**
     * Значение в поле ввода
     */
    value: string,

    /**
     * Имя поля
     */
    name: string,

    optionDefaultValue?: string
}

const ComboboxField: FC<IComboboxFieldProps> = (
    {
        changeHandler,
        valueList,
        value,
        name,
        optionDefaultValue
    }) => {
    return (
        <select onChange={changeHandler}
                defaultValue={value}
                name={name}>
            {
                valueList.map((elem) => {
                    return <option key={elem.id} value={elem.id}>{elem.value}</option>
                })
            }
        </select>
    )
}

export default ComboboxField;

