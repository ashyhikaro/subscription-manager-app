import React, { useEffect, useState, useRef, useCallback } from "react"
import { Subscription } from "../../types/Subscription"

interface ISubscriptionCreateForm {
    subs: Subscription[]
    setSubs: React.Dispatch<React.SetStateAction<Subscription[]>>
}

export const SubscriptionCreateForm: React.FC<ISubscriptionCreateForm> = ({subs, setSubs}) => {
    const [subNameDirty, setSubNameDirty] = useState<boolean>(true)
    const [subPriceDirty, setSubPriceDirty] = useState<boolean>(true)
    const [subDayDirty, setSubDayDirty] = useState<boolean>(true)

    const [formValid, setFormValid] = useState<boolean>(false)

    let nameRef = useRef<HTMLInputElement | undefined>(undefined) as React.RefObject<HTMLInputElement>
    let priceRef = useRef<HTMLInputElement | undefined>(undefined) as React.RefObject<HTMLInputElement>
    let dayRef = useRef<HTMLInputElement | undefined>(undefined) as React.RefObject<HTMLInputElement>
    let colorRef = useRef<HTMLInputElement | undefined>(undefined) as React.RefObject<HTMLInputElement>

    const addNewSubContainerToggleVisability = () => document.querySelector('.create-form-container')?.classList.toggle('invisible')
    
    const blurHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {

        if(!nameRef.current?.value) {
            setSubNameDirty(false)
        }
        if(!priceRef.current?.value) {
            setSubPriceDirty(false)
        }
        if(!dayRef.current?.value) {
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

    const handlePaymentDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = + e.target.value

        if (value > 31) {
            e.target.value = '31'
        }
        if (value < 1) {
            e.target.value = ''
        }
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = +e.target.value

        if (value < 0) {
            e.target.value = '0'
        }
        if (value > 100000) {
            e.target.value = '100000'
        }
    }

    const createNewNotation = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        let newSubParameters: Subscription = {
            name: nameRef.current ? nameRef.current.value: '',
            price: priceRef.current ? +priceRef.current.value : 0,
            day: dayRef.current ? dayRef.current.value: '0',
            color: colorRef.current ? colorRef.current.value : '',
            active: false
        }

        if (nameRef.current) nameRef.current.value = ''
        if (priceRef.current) priceRef.current.value = ''
        if (dayRef.current) dayRef.current.value = ''
        if (colorRef.current) colorRef.current.value = ''

        setFormValid(false)
        setSubs((prev: Subscription[]) => [...prev, newSubParameters])
    }, [subs])

    useEffect(() => {
        if (subNameDirty && subPriceDirty && subDayDirty) {
            if(nameRef.current?.value && priceRef.current?.value && dayRef.current?.value) {
                setFormValid(true)
            }
        } else if(!subNameDirty || !subPriceDirty || !subDayDirty) {
            setFormValid(false)
        }
    }, [subNameDirty, subPriceDirty, subDayDirty])

    return (
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
                        <input type="number" min={1} max={31} className="service-day-input" ref={dayRef} name="day" onBlur={e => blurHandle(e)} onChange={e => handlePaymentDay(e)}/>
                    </label>
                            
                    <button className='service-add-btn' type="button" disabled={!formValid} onClick={e => createNewNotation(e)}>&#10004;</button>
                </form>
            </div>
        </div>
    )
}