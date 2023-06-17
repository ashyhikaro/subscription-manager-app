import React, { useEffect, useState } from 'react'
import '../../styles/sidepanelStyles/money-counter.scss'
import { MoneyPercent } from './MoneyPercent'

interface IMoneyCounter {
    sum: number;
}

export const MoneyCounter: React.FC<IMoneyCounter> = ({sum}) => {
    const [income, setIncome] = useState<number>(localStorage.getItem('income') ? Number(localStorage.getItem('income')) : 0)

    const toggleChangeIncome = () => {
        const input: HTMLInputElement | null = document.querySelector('#count')
        input?.classList.toggle('count-invisiblle')
        if(input) input.value = ''
    }

    const changeIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: number | string = e.target.value
        
        if (typeof value === 'number' && value < 0 || typeof value === 'string' && value === '') {
            setIncome(0)
            e.target.value = ''
        } else {
            setIncome(+value)
        }
    }

    useEffect(() => localStorage.setItem('income', String(income)), [income])

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