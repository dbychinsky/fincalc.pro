import React, {FC} from 'react';
import "./TitlePage.scss";

interface IPageTitle {
    title: string
}

/**
 * Заголовок для страницы/секции
 */
const TitlePage: FC<IPageTitle> = ({title}) => {
    return (
        <h1 className="titlePage">
            {title}
        </h1>
    );
};

export default TitlePage;