import '../../styles/sidepanelStyles/side-panel.scss'
import React from 'react';
import { MoneyCounter } from "./MoneyCounter";
import { UserHandler } from "./UserHandler";

interface ISidePanel {
    sum: number;
}

export const SidePanel: React.FC<ISidePanel> = ({sum}) => {
    return (
        <div className="side-panel-container">
            <UserHandler />
            <MoneyCounter sum={sum}/>
        </div>
    )
}