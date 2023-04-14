import React, {FC} from 'react';
import "./TitleTile.scss";

interface ITitleTile {
    title: string
}

const TitleTile: FC<ITitleTile> = ({title}) => {
    return (
        <h2 className="titleTile">
            {title}
        </h2>
    );
};

export default TitleTile;