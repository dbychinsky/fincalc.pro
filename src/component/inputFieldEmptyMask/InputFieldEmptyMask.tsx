import React, {FC, useState} from "react";
import "./InputFieldEmptyMask.scss";

/**
 * Компонент Input
 */

/**
 * Интерфейс поля расширяется общим
 * интерфейсом IInputFieldProps
 */
type IInputTextFieldEmptyMaskProps = {

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

    /**
     * Текст под полем
     */
    afterText: string

}

const InputTextFieldEmptyMask: FC<IInputTextFieldEmptyMaskProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        afterText
    }) => {
    const [isEmptyField, setIsEmptyField] = useState<string>("");


    const onChangeHand = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.value === '' || e.target.value === null) {
        //     debugger
        //     setIsEmptyField(true);
        // } else {
        //     setIsEmptyField(false);
        // }
    }
    return (
        <div className={`inputTextFieldEmptyMask ${isEmptyField ? 'empty' : 'fill'}`}>
            <input
                className="inputField"
                type={type}
                value={value}
                onInput={changeHandler}
                name={name}
                onChange={onChangeHand}
            />
            <span>{afterText}</span>
        </div>
    )
}

export default InputTextFieldEmptyMask;
