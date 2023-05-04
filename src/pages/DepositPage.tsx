import React from 'react';
import "./DepositPage.scss";
import TitlePage from "../component/titlePage/TitlePage";
import TitleTile from "../component/titleTile/TitleTile";
import DepositEnterData from "../component/depositEnterData/DepositEnterData";
import DepositViewData from "../component/depositViewData/DepositViewData";

const DepositPage = () => {

    return (
        <div className="depositPage">
            <TitlePage title="Депозиты"/>
            <div className="wrapper">
                <TitleTile><span>Расчет процентов по депозиту</span></TitleTile>
                <DepositEnterData/>
                <DepositViewData/>
                <p className="description"><span>* </span>Месяц равен 30 дням</p>
                <p className="description"><span>** </span>
                    Расчет не является обязательством банка по выдаче вклада в указанной сумме.
                    Сумма может отличаться от расчётов банка.</p>
            </div>
        </div>
    );
};

export default DepositPage;