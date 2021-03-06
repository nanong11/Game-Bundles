const params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
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
                   window.location.href = (`./admin-edit-profile.html?userId=${result._id}`)
               })
               const changePasswordBtn = document.querySelector(`.changePasswordBtn`)
               changePasswordBtn.addEventListener(`click`, () => {
                   window.location.href = (`./admin-change-password.html?userId=${result._id}`)
               })
               const deleteAccountBtn = document.querySelector(`#delete-account`)
               deleteAccountBtn.addEventListener(`click`, () => {
                   window.location.href = (`./admin-delete-account.html?userId=${result._id}`)
               })
            })                        
        }else{
            window.location.href = `../../error.html`
        }
    })
}else{
    window.location.href = `../../error.html`
}