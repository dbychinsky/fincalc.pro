import React, {FC, useState} from "react";
import "./TabsLoan.scss";

interface ITabsLoan {
    /**
     * Заголовок для первого таба
     */
    titleFirst: string,

    /**
     * Контент для первого таба
     */
    tabFirst: JSX.Element,

    /**
     * Заголовок для второго таба
     */
    titleSecond: string,

    /**
     * Контент для второго таба
     */
    tabSecond: JSX.Element,
}

/**
 * Компонент Табы. Принимает заголовок и контент
 *
 * @param titleFirst
 * @param tabFirst
 * @param titleSecond
 * @param tabSecond
 */
const TabsLoan: FC<ITabsLoan> = ({
                                     titleFirst,
                                     tabFirst,
                                     titleSecond,
                                     tabSecond
                                 }) => {

    const [activeTab, setActiveTab] = useState("tabFirst");

    const handleTab1 = () => {
        setActiveTab("tabFirst");
    };

    const handleTab2 = () => {
        setActiveTab("tabSecond");
    };

    return (
        <div className="tabsLoan">
            <ul className="tabHeader">
                <li className={activeTab === "tabFirst" ? "active" : ""}
                    onClick={handleTab1}
                >
                    {titleFirst}
                </li>
                <li className={activeTab === "tabSecond" ? "active" : ""}
                    onClick={handleTab2}>
                    {titleSecond}
                </li>
            </ul>

            <div className="tabBody">
                {activeTab === "tabFirst" ?
                    <div className="tabFirst">{tabFirst}</div> :
                    <div className="tabSecond">{tabSecond}</div>
                }
            </div>
        </div>
    );
};
export default TabsLoan;