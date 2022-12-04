import '../../styles/subcriptionsStyles/subscriptions.scss'
import '../../styles/subcriptionsStyles/header.scss'
import '../../styles/subcriptionsStyles/main-panel.scss'
import { Header } from "./Header";
import { Subscriptions } from "./Subsciptions";

export function MainPanel()  {
    return (
        <div className="main-panel-container">
            <Header />
            <Subscriptions />
        </div>
    )
}