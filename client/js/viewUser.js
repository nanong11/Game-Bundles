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
       const setAdminBtn = document.querySelector(`.setAdmin`)
       setAdminBtn.addEventListener(`click`, ()=> {
           fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/isAdmin`, {
               method: "PATCH",
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`
               },
               body: JSON.stringify({email: result.email})
           })
           .then(result => result.json())
           .then(result => {
               if(result.isAdmin){
                   alert(`${result.firstName} ${result.lastName} is now an admin.`)
                   return window.location.replace(`./admin-view-users.html`)
               }else{
                   alert(`Cannot set Admin please try again.`)
               }
           })
       })
    })            
        }else{
            return window.location.href = `../../error.html`            
        }
    })
}else{
    window.location.href = `../../error.html`
}
