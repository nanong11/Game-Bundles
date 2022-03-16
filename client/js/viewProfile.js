const params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)

const token = localStorage.getItem(`token`)

//HEROKU HOSTED
const findUserRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/${userId}`

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

           const editProfileBtn = document.querySelector(`.editProfileBtn`)
           editProfileBtn.addEventListener(`click`, () => {
               window.location.replace(`./editProfile.html?=${result._id}`)
           })

           const changePasswordBtn = document.querySelector(`.changePasswordBtn`)
           changePasswordBtn.addEventListener(`click`, () => {
               window.location.replace(`./changePassword.html?=${result._id}`)
           })
        
        })

    }else{
        return window.location.href = `../../error.html`
    }
})