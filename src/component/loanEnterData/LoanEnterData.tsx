import React, {useContext} from 'react';
import FormRow from "../formRow/FormRow";
import InputTextField from "../inputField/InputField";
import {StoreContext} from "../../App";
import {observer} from "mobx-react";
import "./LoanEnterData.scss";
import TitleTile from "../titleTile/TitleTile";
import ComboboxCurrencyField from "../comboboxCurrencyField/ComboboxCurrencyField";
import {CurrencyCombobox} from "../../model/Currency";

/**
 * Компонент ввода данных для расчета кредита
 */
const LoanEnterData = observer(() => {

    const loanStore = useContext(StoreContext).loanStore;

    return (
        <div className="loanEnterData">
            <TitleTile><span>Расчет платежей по кредиту</span></TitleTile>
            <FormRow label={"Кредитуемая сумма:"}
                     className="amount"
                     children={<InputTextField
                         value={loanStore.loanValuesEnter.fullAmount ? loanStore.loanValuesEnter.fullAmount : ''}
                         changeHandler={loanStore.handleChange}
                         name="fullAmount"
                         type="number"/>}/>
            <FormRow label={"Валюта:"}
                     className="currency"
                     children={
                         <ComboboxCurrencyField valueList={CurrencyCombobox}
                                                actualStore={loanStore}/>}
            />

            <FormRow label={"Процент:"}
                     children={<InputTextField
                         value={loanStore.loanValuesEnter.percent ? loanStore.loanValuesEnter.percent : ''}
                         changeHandler={loanStore.handleChange}
                         name="percent"
                         type="number"/>}/>
            <FormRow label={"Количество месяцев:"}
                     children={<InputTextField
                         value={loanStore.loanValuesEnter.countMonth ? loanStore.loanValuesEnter.countMonth : ''}
                         changeHandler={loanStore.handleChange}
                         name="countMonth"
                         type="number"/>}/>
        </div>
    );
});

export default LoanEnterData;