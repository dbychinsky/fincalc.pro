import React, {useContext} from 'react';
import {StoreContext} from "../../App";
import FormRow from "../formRow/FormRow";
import InputTextField from "../inputField/InputField";
import ComboboxCurrencyField from "../comboboxCurrencyField/ComboboxCurrencyField";
import {CurrencyCombobox} from "../../model/Currency";
import "./DepositEnterData.scss";
import {observer} from "mobx-react";

const DepositEnterData = observer(() => {

    const depositStore = useContext(StoreContext).depositStore;

    return (
        <div className="depositEnterData">
            <FormRow label={"Сумма вклада:"}
                     className="amount"
                     children={<InputTextField
                         value={depositStore.depositValuesEnter.depositAmount
                             ? depositStore.depositValuesEnter.depositAmount
                             : ''}
                         changeHandler={depositStore.handleChange}
                         name="depositAmount"
                         type="number"/>}/>
            <FormRow label={"Валюта:"}
                     className="currency"
                     children={
                         <ComboboxCurrencyField valueList={CurrencyCombobox}
                                                actualStore={depositStore}/>}
            />
            <FormRow label={"Проценты по вкладу:"}
                     children={<InputTextField
                         value={depositStore.depositValuesEnter.percent
                             ? depositStore.depositValuesEnter.percent
                             : ''}
                         changeHandler={depositStore.handleChange}
                         name="percent"
                         type="number"/>}/>
            <FormRow label={"Срок вклада (мес.):"}
                     children={<InputTextField
                         value={depositStore.depositValuesEnter.countMonth
                             ? depositStore.depositValuesEnter.countMonth
                             : ''}
                         changeHandler={depositStore.handleChange}
                         name="countMonth"
                         type="number"/>}/>
        </div>
    );
});

export default DepositEnterData;