import React, { useState } from 'react'
import '../../styles/sidepanelStyles/user-handler.scss'
import { UserSettingForm } from './forms/UserSettingForm'

export const UserHandler: React.FC = () => {
    const [nickname, setNickname] = useState<string | null>(localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'User nickname')

    const userFormToggleVisability = () => document.querySelector('.user-form')?.classList.toggle('form-non-active')

    return  (
        <>
            <div className='user-container'>
                <div className='user-avatar'/>    
                <p className='user-nickname'>{nickname}</p>
                <button className='user-form-open-btn' onClick={userFormToggleVisability}>&#9998;</button>
            </div>

            <UserSettingForm 
                setNickname={setNickname}
                userFormToggleVisability={userFormToggleVisability}
            />
        </>
    )
}