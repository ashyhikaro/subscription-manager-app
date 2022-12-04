export function Header() {
    const addNewSubContainerToggleVisability = () => document.querySelector('.create-form-container')?.classList.toggle('invisible')

    return (
        <div className='header-container'>
            <div className="header-title-container">
                <h1>MY SUBSCRIPTIONS</h1>
                <button className="add-sub-btn" onClick={addNewSubContainerToggleVisability}>&oplus; add</button>
            </div>
        </div>
    )
}