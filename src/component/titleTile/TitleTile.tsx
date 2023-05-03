import React, {ReactNode} from 'react';
import "./TitleTile.scss";

const TitleTile = (props: { children: ReactNode }) => {
    return (
        <h2 className="titleTile">
            {props.children}
        </h2>
    );
};

export default TitleTile;