import { useEffect, useState } from 'react'
import '../../styles/sidepanelStyles/money-counter.scss'
import { MoneyPercent } from './MoneyPercent'

export function MoneyCounter({sum}) {
    const [income, setIncome] = useState(localStorage.getItem('income') ? localStorage.getItem('income') : 0)

    const toggleChangeIncome = () => {
        const input = document.querySelector('#count')
        input.classList.toggle('count-invisiblle')
        input.value = ''
    }

    const changeIncome = (e) => {
        let value = e.target.value
        
        if (value < 0 || value === '') {
            setIncome(0)
            e.target.value = ''
        } else {
            setIncome(value)
        }
    }

    useEffect(() => {localStorage.setItem('income', income)}, [income])

    return  (
        <div className='user-money-counter'>
            <div className='profit-container'>
                <p className='profit-title profit-text'>Your income</p>
                <div className='profit-count-container'>
                    <div className='count-form'>
                        <label htmlFor="count" className='profit-count profit-text'>{income}</label>
                        <input id='count' type='number' className='count-invisiblle' onChange={e => changeIncome(e)}/>
                    </div>
                    <button className='profit-count-btn' onClick={toggleChangeIncome}>&#9998;</button>
                </div>
                <p className='profit-currency profit-text'>USD/month</p>
            </div>

            <div className='profit-container'>
                <p className='profit-title profit-text'>Subscriptions</p>
                <p className='profit-count profit-text'>{sum}</p>
                <p className='profit-currency profit-text'>USD/month</p>
            </div>

            <MoneyPercent sumOfSubs={sum} income={income}/>
        </div>
    )
}