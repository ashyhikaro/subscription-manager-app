import { addNewSubContainerToggleVisability } from '../../functions/addContainerVisabillity'

export function Header() {
    return (
        <div className='header-container'>
            <div className="header-title-container">
                <h1>MY SUBSCRIPTIONS</h1>
                <button className="add-sub-btn" onClick={addNewSubContainerToggleVisability}>&oplus; add</button>
            </div>
        </div>
    )
}