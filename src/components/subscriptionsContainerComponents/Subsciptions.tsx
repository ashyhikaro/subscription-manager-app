import React, { useEffect, useState, useCallback } from 'react'
import { SubscriptionCreateForm } from './forms/SubcriptionCreateForm'
import { Subscription } from '../types/Subscription';

interface ISubscriptions {
    setSum: React.Dispatch<React.SetStateAction<number>>;
    sum: number;
}

let activeSubId: null | number = null
let subsArr: Subscription[] = []

export const Subscriptions: React.FC<ISubscriptions> = ({setSum, sum}) => {
    const [subs, setSubs] = useState<Array<Subscription>>(
        () => {
          const subsFromLocalStorage: string | null = localStorage.getItem('subs');
          if (subsFromLocalStorage !== null) {
            return JSON.parse(subsFromLocalStorage);
          }
          return [];
        }
    );

    let subsList: NodeListOf<Element>

    const queryAllSubs = (e: any |  Event | MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e) {e.stopImmediatePropagation()}

        subsList = document.querySelectorAll('.subscribtion-container')
        let notActiveSubs: Array<Subscription> = []
        
        subsList.forEach(item => {
            let targetObj: Subscription = subsArr[+item.id]
            targetObj.active = false
            notActiveSubs.push(targetObj)
        })
        setSubs([...notActiveSubs])
    }

    const doAllNotActiveAfterPageLoading = () => {
        let allSubsNotActive = subs.map(sub => {
            sub.active = false
            return sub
        })

        setSubs(allSubsNotActive)
    }

    const deleteNotation = (e: any |  Event | React.MouseEvent<HTMLButtonElement>) => {
        e.stopImmediatePropagation()
        
        const target = e.target as HTMLElement
        const closestContainer: Element | null = target.closest('.subscribtion-container')
        if (closestContainer) {
            const id: number = +closestContainer.id
            setSubs(prev => [...prev.slice(0, id), ...prev.slice(id + 1)])
            activeSubId = null
        }
    }

    const changeActive = useCallback((e: any | Event | React.MouseEvent<HTMLDivElement>) => {
        e.stopImmediatePropagation()

        const target = e.target as HTMLElement
        const closestContainer: Element | null = target.closest('.subscribtion-container')

        if (closestContainer) {
            const targetId: number = +closestContainer.id
            const targetObj: Subscription = subsArr[targetId]

            if (targetId === activeSubId) {
                if (targetObj.active) {
                    targetObj.active = false
                    activeSubId = null
                } else {
                    targetObj.active = true
                    activeSubId = targetId
                }
                setSubs(prev => [...prev.slice(0, targetId), JSON.parse(JSON.stringify(targetObj)), ...prev.slice(targetId + 1)])
            } else {
                activeSubId = targetId
                queryAllSubs(e)
                changeActive(e)
            }
        }   
    }, [])

    useEffect(() => doAllNotActiveAfterPageLoading, [])

    useEffect(() => {
        localStorage.setItem('subs', JSON.stringify(subs))

        let sumOfSubs = subs.reduce((sum, sub) => parseFloat(String(sum)) + parseFloat(String(sub.price)), 0).toFixed(2)
        if (sum !== +sumOfSubs) {
            setSum(+sumOfSubs)
            localStorage.setItem('sumOfSubs', sumOfSubs)
        }

        subsArr = subs

        document.querySelectorAll('.subscribtion-container').forEach(item => {
            item.addEventListener('click', e => changeActive(e))
        })

        document.querySelectorAll('.sub-delete-btn').forEach(item => {
            item.addEventListener('click', e => deleteNotation(e))
        })

        document.addEventListener('click', e => queryAllSubs(e))
        
    }, [subs])

    return (
        <>
            <SubscriptionCreateForm 
                subs={subs}
                setSubs={setSubs}
            />

            <div className='subscribtions-container'>
                {subs.length > 0 ? subs.map((sub, index: number) => 
                    <div 
                        className={sub.active ? "subscribtion-container chose-sub" : "subscribtion-container"} 
                        key={index} 
                        id={String(index)}
                    >
                        <div className='sub-title-container'>
                            <span className="sub-logo sub-text" style={{color: sub.color}}>{sub.name[0].toUpperCase()}</span>
                            <p className="sub-title sub-text">{sub.name}</p>
                        </div>

                        <div className='sub-price-container'>
                            <p className="sub-price sub-text">$ {Number(sub.price).toFixed(2)}</p>
                        </div>

                        <div className='sub-day-container'>
                            <p className="sub-day sub-text">{sub.day}th</p>
                        </div>

                        {sub.active && <div className='sub-btns-container'>
                            <button className="sub-delete-btn sub-text">&#x1F5D1;</button>
                        </div>}
                    </div>) 
                : null}
            </div>
        </>
    )
}