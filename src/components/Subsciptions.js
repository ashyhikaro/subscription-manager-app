import { useEffect, useState, useRef, useCallback } from 'react'
import { addNewSubContainerToggleVisability } from '../functions/addContainerVisabillity'

let activeSubId = null, subsArr

export function Subscriptions() {
    const [subs, setSubs] = useState(() => localStorage.getItem('subs') ? JSON.parse(localStorage.getItem('subs')) : [])
    let subsList

    const [subNameDirty, setSubNameDirty] = useState(true)
    const [subPriceDirty, setSubPriceDirty] = useState(true)
    const [subDayDirty, setSubDayDirty] = useState(true)

    const [formValid, setFormValid] = useState(false)

    let nameRef = useRef()
    let priceRef = useRef()
    let dayRef = useRef()
    let colorRef = useRef()

    const queryAllSubs = (e) => {
        if (e) {e.stopImmediatePropagation()}

        subsList = document.querySelectorAll('.subscribtion-container')
        let notActiveSubs = []
        
        subsList.forEach(item => {
            let targetId = item.id
            let targetObj = subsArr[targetId]
            targetObj.active = false
            notActiveSubs.push(targetObj)
        })
        setSubs([...notActiveSubs])
    }

    const blurHandle = (e) => {

        if(!nameRef.current.value) {
            setSubNameDirty(false)
        }
        if(!priceRef.current.value) {
            setSubPriceDirty(false)
        }
        if(!dayRef.current.value) {
            setSubDayDirty(false)
        }

        if (!e.target.value) {
            switch (e.target.name) {
                case 'name': 
                    setSubNameDirty(false)
                    break;
                case 'price':
                    setSubPriceDirty(false)
                    break;
                case 'day':
                    setSubDayDirty(false)
                    break;
            }
        } else {
            switch (e.target.name) {
                case 'name':
                    setSubNameDirty(true)
                    break;
                case 'price':
                    setSubPriceDirty(true)
                    break;
                case 'day':
                    setSubDayDirty(true)
                    break;
            }
        }
    }

    const handlePaymentDay = (e) => {
        let value = e.target.value
        if (value > 31) {
            e.target.value = 31
        }
        if (value < 1) {
            e.target.value = ''
        }
    }

    const handlePrice = (e) => {
        let value = e.target.value
        if (value < 0) {
            e.target.value = 0
        }
        if (value > 100000) {
            e.target.value = 100000
        }
    }

    const doAllNotActiveAfterPageLoading = () => {
        let allSubsNotActive = subs.map(sub => {
            sub.active = false
            return sub
        })

        setSubs(allSubsNotActive)
    }

    const createNewNotation = useCallback((e) => {
        e.preventDefault()

        let newSubParameters = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            day: dayRef.current.value,
            color: colorRef.current.value,
            active: false
        }

        nameRef.current.value = ''
        priceRef.current.value = ''
        dayRef.current.value = ''
        colorRef.current.value = ''

        setFormValid(false)
        setSubs(prev => [...prev, newSubParameters])
    }, [subs])

    const deleteNotation = (e) => {
        e.stopImmediatePropagation()
        let targetId = parseInt(e.target.closest('.subscribtion-container').id)
        setSubs(prev => [...prev.slice(0, targetId), ...prev.slice(targetId + 1)])
        activeSubId = null
    }

    const changeActive = useCallback((e) => {
        e.stopImmediatePropagation()

        let targetId = parseInt(e.target.closest('.subscribtion-container').id)
        let targetObj = subsArr[targetId]

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
    }, [])

    useEffect(() => {
        if (subNameDirty && subPriceDirty && subDayDirty) {
            if(nameRef.current.value && priceRef.current.value && dayRef.current.value) {
                setFormValid(true)
            }
        } else if(!subNameDirty || !subPriceDirty || !subDayDirty) {
            setFormValid(false)
        }
    }, [subNameDirty, subPriceDirty, subDayDirty])

    useEffect(() => doAllNotActiveAfterPageLoading, [])

    useEffect(() => {
        localStorage.setItem('subs', JSON.stringify(subs))

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
            <div className="form-container">
                <div className="form-titles-container">
                    <p className="form-title">service</p>
                    <p className="form-title">price (month/USD)</p>
                    <p className="form-title">payment day</p>
                </div>
                <div className="create-form-container invisible">
                    <div className='create-form-header'>
                        <h3>Create new notation:</h3>
                        <button className='form-close-btn' onClick={() => {
                            addNewSubContainerToggleVisability()
                            setSubNameDirty(true)
                            setSubPriceDirty(true)
                            setSubDayDirty(true)
                        }}>&#10006;</button>
                    </div>
                    
                    <form className="create-sub-form" onSubmit={e => e.preventDefault()}>
                        <input type="color" className="service-color-input" ref={colorRef} name="color" />

                        <label>
                            <span className='create-sub-form-title'>Name:</span>
                            {!subNameDirty && <div className="error-message">*Enter a name</div>}
                            <input type="text" className="service-name-input" maxLength={20} ref={nameRef} name="name" onBlur={e => blurHandle(e)} />
                        </label>
                        <label>
                            <span className='create-sub-form-title'>Price:</span>
                            {!subPriceDirty && <div className="error-message">*Enter price</div>}
                            <input type="number" min={0} max={100000} className="service-price-input" ref={priceRef} name="price" onBlur={e => blurHandle(e)} onChange={e => handlePrice(e)}/>
                        </label>
                        <label>
                            <span className='create-sub-form-title'>Payment day:</span>
                            {!subDayDirty && <div className="error-message">*Enter the payment date</div>}
                            <input type="number"min={1} max={31} className="service-day-input" ref={dayRef} name="day" onBlur={e => blurHandle(e)} onChange={e => handlePaymentDay(e)}/>
                        </label>
                                
                        <button className='service-add-btn' type="submit" disabled={!formValid} onClick={createNewNotation}>&#10004;</button>
                    </form>
                </div>
            </div>

            <div className='subscribtions-container'>
                {subs.length > 0 ? subs.map((sub, index) => 
                    <div className={sub.active ? "subscribtion-container chose-sub" : "subscribtion-container"} key={index} id={index} onClick={changeActive}>
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