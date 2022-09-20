import { useEffect, useState } from 'react'
import '../styles/money-percent.scss'

export function MoneyPercent({sumOfSubs, income}) {
    const [percentOfIncome, setPercentOfIncome] = useState(localStorage.getItem('percentOfIncome') ? localStorage.getItem('percentOfIncome') : 0)

    const setProgress = (percent, circle, circumference) => {
        const offset = circumference - percent / 100 * circumference
        circle.style.strokeDashoffset = offset
    }
    
    const percentCounter = () => {
        let profit = parseFloat(income)
        let sum = parseFloat(sumOfSubs)
        if (profit > 0) {
            if (profit > sum) {
                let percent = 0
                percent = (sum * 100 / profit).toFixed(2)
                setPercentOfIncome(percent)
            } else {
                setPercentOfIncome(100)
            }
        } else {
            setPercentOfIncome(0)
        }
        
    }

    useEffect(() => {
        localStorage.setItem('percentOfIncome', percentOfIncome)
        const circle = document.querySelector('.progress-ring__circle')
        const radius = circle.r.baseVal.value
        const circumference = 2 * Math.PI * radius

        circle.style.strokeDasharray = `${circumference} ${circumference}`
        circle.style.strokeDashoffset = circumference

        setProgress(percentOfIncome, circle, circumference)
    }, [percentOfIncome])

    useEffect(() => {
        percentCounter()
    })

    return  (
        <div className='percent-container'>
            <p className='percent-title'>The percentage of your profit</p>
            <div className='percent-value-container'>
                <svg className='progress-ring_back'  width='100%' height='100%' >
                    <circle className='progress-ring__circle_back' 
                            stroke='#E8E8E8' strokeWidth='16' 
                            cx='50%' cy='50%' r='32%'
                            fill='transparent'
                    ></circle>
                </svg>
                <svg className='progress-ring' width='100%' height='100%' >
                    <circle className='progress-ring__circle' 
                            stroke='#7082DE' strokeWidth='16' 
                            cx='50%' cy='50%' r='32%'
                            fill='transparent'
                    ></circle>
                </svg>
                <p className='percent-value'>{percentOfIncome}%</p>
            </div> 
        </div>
    )
}