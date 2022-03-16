window.addEventListener(`load`, () => {
    if(token){
        fetch(findUserRequest, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
           const h1 = document.querySelector(`h1`)
           h1.innerText = `${result.firstName} ${result.lastName}`

           const p = document.querySelector(`p`)
           p.innerText = `${result.email}`

           const editProfileBtn = document.querySelector(`.editProfileBtn`)
           editProfileBtn.addEventListener(`click`, () => {
               window.location.replace(`./editProfile.html?userId=${result._id}`)
           })

           const changePasswordBtn = document.querySelector(`.changePasswordBtn`)
           changePasswordBtn.addEventListener(`click`, () => {
               window.location.replace(`./changePassword.html?userId=${result._id}`)
           })
        
        })

    }else{
        return window.location.href = `../../error.html`
    }
})