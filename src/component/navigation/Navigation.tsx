import React from 'react';
import "./Navigation.scss";
import {NavLink} from "react-router-dom";
import {RouterPathList} from "../../router/RouterPathList";
import {CiBadgeDollar, CiBag1, CiDiscount1, CiDollar} from "react-icons/ci";


const Navigation = () => {
    return (
        <ul className="navigation">
            <li><NavLink to={RouterPathList.CURRENCY_PAGE}
                         className="cur"
                         title="CURRENCY_PAGE">
                <span><CiDollar/></span>
                <span>Курсы</span>
            </NavLink>
            </li>
            <li><NavLink to={RouterPathList.PEAR_PAGE}
                         className="pear"
                         title="PEAR_PAGE">
                <span><CiBadgeDollar/></span>
                <span>Рассрочки</span>
            </NavLink>
            </li>
            <li><NavLink to={RouterPathList.LOAN_PAGE}
                         className="loan"
                         title="LOAN_PAGE">
                <span><CiDiscount1/></span>
                <span>Кредиты</span>
            </NavLink>
            </li>
            <li><NavLink to={RouterPathList.DEPOSIT_PAGE}
                         className="deposit"
                         title="DEPOSIT_PAGE">
                <span><CiBag1/></span>
                <span>Депозиты</span>
            </NavLink>
            </li>

        </ul>
    );
};

export default Navigation;