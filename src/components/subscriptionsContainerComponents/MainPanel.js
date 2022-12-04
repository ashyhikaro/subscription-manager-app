import '../../styles/subcriptionsStyles/subscriptions.scss'
import '../../styles/subcriptionsStyles/header.scss'
import '../../styles/subcriptionsStyles/main-panel.scss'
import '../../styles/media-req.scss'
import { Header } from "./Header";
import { Subscriptions } from "./Subsciptions";

export function MainPanel({setSum})  {
    return (
        <div className="main-panel-container">
            <Header />
            <Subscriptions setSum={setSum} />
        </div>
    )
}