import React, { useRef, useEffect, SetStateAction } from 'react'

interface IUserSettingForm {
    setNickname: React.Dispatch<SetStateAction<string | null>>
    userFormToggleVisability: () => void
}

export const UserSettingForm: React.FC<IUserSettingForm> = ({setNickname, userFormToggleVisability}) => {
    let nicknameRef = useRef<HTMLInputElement | undefined>(undefined) as React.RefObject<HTMLInputElement>

    const saveData = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
        if(e) e.preventDefault()

        let nickData: string | undefined = nicknameRef.current?.value

        if (typeof nickData === 'string' && nickData.trim() !== '') {
            localStorage.setItem('nickname', nickData)
            setNickname(nickData)
        }

        if (nicknameRef.current) nicknameRef.current.value = ''

        localStorage.setItem('avatar', preview ? preview.style.backgroundImage : '')
    }

    let preview: HTMLDivElement | null

    const changeAvatar = (e?: React.ChangeEvent<HTMLInputElement>) => {
        let file: File | null = null
        let url: string | null = null

        if (localStorage.getItem('avatar')) {
            url = localStorage.getItem('avatar')
        }

        if (e) {
            const fileInput = document.querySelector('.avatar-input') as HTMLInputElement | null;
            file = fileInput && fileInput.files ? fileInput.files[0] : null;

            let type = file?.type
            if (type?.match(/image\/gif/)) return
            if (!type?.match(/image/)) return
        }

        let reader = new FileReader()

        reader.onloadend = function () {
            if (preview) preview.style.backgroundImage = `url(${reader.result})`
        }

        if (file || url) {
            if (file) {
                reader.readAsDataURL(file)
            } else {
                if (preview && url) preview.style.backgroundImage = url
            }
            
        } else {
            if (preview) preview.style.backgroundColor = 'rgb(156, 156, 156)'
            if (preview) preview.classList.add('non-active')
        } 
    }

    useEffect(() => {
        preview = document.querySelector('.user-avatar') ? document.querySelector('.user-avatar') : null
        return localStorage.getItem('avatar') ? changeAvatar() : undefined
    })

    return (
        <form onSubmit={e => saveData(e)} className='user-form form-non-active'>
            <div className='setting-header'>
                <p className='setting-title'>Settings</p>
                <button className='user-form-close-btn' type="button" onClick={userFormToggleVisability}>&#10006;</button>
            </div>

            <label htmlFor="nickname" className='setting-prop-title'>Username:</label>
            <input type="text" name='nickname' maxLength={15} id='nickname' ref={nicknameRef}/>

            <p className='setting-prop-title'>User image:</p>
            <div className='load-avatar-container'>
                <label htmlFor="avatar">Choose image 
                    <input type="file" name='avatar' id='avatar' onChange={e => changeAvatar(e)} className='avatar-input'/>
                </label>
            </div>

            <button onClick={saveData} className='user-form-save-btn'>Save changes</button>
        </form>
    )
}