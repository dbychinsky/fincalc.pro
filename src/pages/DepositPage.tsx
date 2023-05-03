import React from 'react';
import "./DepositPage.scss";
import TitlePage from "../component/titlePage/TitlePage";
import TitleTile from "../component/titleTile/TitleTile";

const DepositPage = () => {
    return (
        <div className="depositPage">
            <TitlePage title="Депозиты"/>
            <div className="depositEnterData">
                <TitleTile><span>Расчет процентов по депозиту</span></TitleTile>
                <p>Страница в разработке</p>
            </div>
        </div>
    );
};

export default DepositPage;