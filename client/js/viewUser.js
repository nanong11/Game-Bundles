const params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)
const token = localStorage.getItem(`token`)

//HEROKU HOSTED
const findUserRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/${userId}`
const setAsAdminRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/isAdmin`

//LOCAL HOSTED
// const findUserRequest = `http://localhost:3011/api/users/${userId}`
// const setAsAdminRequest = `http://localhost:3011/api/users/isAdmin`

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

           const setAdminBtn = document.querySelector(`.setAdmin`)
           setAdminBtn.addEventListener(`click`, ()=> {
               fetch(setAsAdminRequest, {
                   method: "PATCH",
                   headers: {
                       "Content-Type": "application/json",
                       "Authorization": token
                   },
                   body: JSON.stringify({email: result.email})
               })
               .then(result => result.json())
               .then(result => {
                   if(result.isAdmin){
                       alert(`Set Admin successfully.`)
                       return window.location.replace(`./admin-view-users.html`)
                   }else{
                       alert(`Cannot set Admin please try again.`)
                   }
               })
           })

        //    const h5 = document.querySelector(`h5`)
        //    if(result?.gameBundles?.length <= 0){
        //        h5.innerText = `No Game Bundles Order`
        //    }else{
        //        h5.innerText = `Game Bundles Orders`
        //        const ul = document.querySelector(`ul`)
        //        const li = document.createElement(`li`)
        //    }
           
        })

    }else{
        return window.location.href = `../../error.html`
    }
})