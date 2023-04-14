import {Route, Routes} from "react-router";
import {RouterPathList} from "./RouterPathList";
import PearPage from "../pages/PearPage";
import CurrencyRatePage from "../pages/CurrencyRatePage";
import LoanPage from "../pages/LoanPage";
import DepositPage from "../pages/DepositPage";
import MainPage from "../pages/MainPage";

/**
 * Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>
            <Route path={RouterPathList.ROOT_PATH} element={<MainPage/>}/>
            <Route path={RouterPathList.PEAR_PAGE} element={<PearPage/>}/>
            <Route path={RouterPathList.CURRENCY_PAGE} element={<CurrencyRatePage/>}/>
            <Route path={RouterPathList.DEPOSIT_PAGE} element={<DepositPage/>}/>
            <Route path={RouterPathList.LOAN_PAGE} element={<LoanPage/>}/>
        </Routes>
    );
};