import '../../styles/subcriptionsStyles/subscriptions.scss'
import '../../styles/subcriptionsStyles/header.scss'
import '../../styles/subcriptionsStyles/main-panel.scss'
import '../../styles/media-req.scss'
import React from 'react'
import { Header } from "./Header";
import { Subscriptions } from "./Subsciptions";

interface IMainPanel {
    setSum: React.Dispatch<React.SetStateAction<number>>;
    sum: number;
}

export const MainPanel: React.FC<IMainPanel> = ({setSum, sum}) => {
    return (
        <div className="main-panel-container">
            <Header />
            <Subscriptions setSum={setSum} sum={sum}/>
        </div>
    )
}