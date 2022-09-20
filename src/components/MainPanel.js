import { Header } from "./Header";
import { Subscriptions } from "./Subsciptions";
import '../styles/subscriptions.scss'
import '../styles/header.scss'
import '../styles/main-panel.scss'

export function MainPanel()  {
    return (
        <div className="main-panel-container">
            <Header />
            <Subscriptions />
        </div>
    )
}