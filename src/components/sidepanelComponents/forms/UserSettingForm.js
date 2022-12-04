import { useRef, useEffect } from 'react'

export function UserSettingForm({setNickname, userFormToggleVisability}) {
    let nicknameRef = useRef()

    const saveData = (e) => {
        if(e) e.preventDefault()

        let nickData = nicknameRef.current.value

        if (nickData.trim() !== '') {
            localStorage.setItem('nickname', nickData)
            setNickname(nickData)
        }

        nicknameRef.current.value = ''

        localStorage.setItem('avatar',  preview.style.backgroundImage)
    }

    let preview

    const changeAvatar = (e) => {
        let file, url

        if (localStorage.getItem('avatar')) {
            url = localStorage.getItem('avatar')
        }

        if (e) {
            file = document.querySelector('.avatar-input').files[0];
            let type = file.type
            if (type.match(/image\/gif/)) return
            if (!type.match(/image/)) return
        }

        let reader = new FileReader()

        reader.onloadend = function () {
            preview.style.backgroundImage = `url(${reader.result})`
        }

        if (file || url) {
            if (file) {
                reader.readAsDataURL(file)
            } else {
                preview.style.backgroundImage = url
            }
            
        } else {
            preview.style.backgroundColor = 'rgb(156, 156, 156)'
            preview.classList.add('non-active')
        } 
    }

    useEffect(() => {
        preview = document.querySelector('.user-avatar');
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