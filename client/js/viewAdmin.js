const params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin === true){
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
               const removeAdminBtn = document.querySelector(`.removeAdmin`)
               removeAdminBtn.addEventListener(`click`, ()=> {
                   fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/isUser`, {
                       method: "PATCH",
                       headers: {
                           "Content-Type": "application/json",
                           "Authorization": `Bearer ${token}`
                       },
                       body: JSON.stringify({email: result.email})
                   })
                   .then(result => result.json())
                   .then(result => {
                       if(result.isAdmin === false){
                           alert(`${result.firstName} ${result.lastName} is successfully remove as an admin.`)
                           return window.location.replace(`./admin-view-admins.html`)
                       }else{
                           alert(`Cannot remove as Admin please try again.`)
                       }
                   })
               })
            })
        }else{
            window.location.href = `../../error.html`
        }
    })
}else{
    window.location.href = `../../error.html`
}