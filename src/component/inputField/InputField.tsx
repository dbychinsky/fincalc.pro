import React, {FC} from "react";
import "./InputField.scss";

/**
 * Компонент Input
 */

/**
 * Интерфейс поля расширяется общим
 * интерфейсом IInputFieldProps
 */
type IInputTextFieldProps = {

    /**
     * Значение в поле ввода
     */
    value: string | number,

    /**
     * Метод, вызываемый при изменении значения в поле ввода
     *
     * @param e новое значение
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

    /**
     * Имя поля
     */
    name: string,

    /**
     * Тип поля
     */
    type: string

}

const InputTextField: FC<IInputTextFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
    }) => {
    return (
        <input
            className="inputTextField"
            type={type}
            value={value}
            onInput={changeHandler}
            name={name}
        />
    )
}

export default InputTextField;
