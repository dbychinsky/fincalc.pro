import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import './ComboboxCurrencyField.scss';
import {StoreContext} from "../../App";

/**
 * Компонент Combobox
 */
type IComboboxCurrencyFieldProps = {

    /**
     * Возможные значения
     */
    valueList: { id: string, value: string }[],
}

const ComboboxCurrencyField: FC<IComboboxCurrencyFieldProps> = (
    {
        valueList,
    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectValue, setSelectValue] = useState('USD');
    const ref = useRef<any>();
    const currencyRateStore = useContext(StoreContext).currencyRateStore;

    const handleOnClick = (value: string) => {
        currencyRateStore.changeHandlerCurrencyHandle(value);
        setSelectValue(value);
        setIsOpen(false);
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isOpen])

    return (
        <div className="comboboxCurrencyField"
             ref={ref}>
            <button
                className={`buttonSelect ${selectValue}`}
                onClick={() => setIsOpen(oldState => !oldState)}>
                {currencyRateStore.currencyValue}
            </button>
            {isOpen && (
                <ul className="list">
                    {valueList.map(currency => (
                        <li className={`listItem ${currency.value}`} key={currency.id}
                            onClick={() => handleOnClick(currency.value)}>
                            {currency.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboboxCurrencyField;

