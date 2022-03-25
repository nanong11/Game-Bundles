let params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)

const changePasswordForm = document.querySelector(`#changePasswordForm`)

changePasswordForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
        .then(result => result.json())
        .then(result => {
            if(result.isAdmin){
                const oldPassword = document.querySelector(`#oldPassword`).value
                const newPassword = document.querySelector(`#newPassword`).value
                const confirmNewPassword = document.querySelector(`#confirmNewPassword`).value
            
                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(result => result.json())
                .then(result => {
                    if(result){
                        if(newPassword === confirmNewPassword){
                            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/update/password`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                     oldPassword, newPassword
                                })
                            })
                            .then(result => result.json())
                            .then(result => {
                                if(result){
                                    alert(`Password successfully changed.`)
                                    return window.location.replace(`./admin-profile.html?userId=${userId}`)
                                }else if(result == false){
                                    alert(`Please input correct old password.`)
                                    changePasswordForm.reset()
                                }else{
                                    return window.location.href = `.././error.html`
                                }
                            })
                        }else{
                            alert(`Please confirm new password`)
                            changePasswordForm.reset()
                        }
                    }else{
                        return window.location.href = `.././error.html`
                    }
                })                
            }else{
                return window.location.href = `.././error.html`                
            }
        })
        
    }else{
        return window.location.href = `.././error.html`
    }
})

const goBack = document.querySelector(`#go-back`)
goBack.addEventListener(`click`, () => {
    window.location.href = `./admin-profile.html?userId=${userId}`
})