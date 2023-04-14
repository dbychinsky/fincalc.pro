import React from 'react';
import "./LoanPage.scss"
import TitlePage from "../component/titlePage/TitlePage";
import LoanEnterData from "../component/loanEnterData/LoanEnterData";
import LoanViewData from "../component/loanViewData/LoanViewData";

/**
 * Страница расчета платежей по кредиту
 */
const LoanPage = () => {
    return (
        <div className="loanPage">
            <TitlePage title="Кредиты"/>
            <div className="wrapper">
                <LoanEnterData/>
                <LoanViewData/>
            </div>
        </div>
    );
};

export default LoanPage;