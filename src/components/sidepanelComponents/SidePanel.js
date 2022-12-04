import '../../styles/sidepanelStyles/side-panel.scss'
import { MoneyCounter } from "./MoneyCounter";
import { UserHandler } from "./UserHandler";

export function SidePanel({sum})  {
    return (
        <div className="side-panel-container">
            <UserHandler />
            <MoneyCounter sum={sum}/>
        </div>
    )
}