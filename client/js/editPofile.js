let params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)
// const token =localStorage.getItem(`token`) - token has been declared

const firstName = document.querySelector(`#firstName`)
const lastName = document.querySelector(`#lastName`)
const email = document.querySelector(`#email`)

fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/${userId}`, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
.then(result => result.json())
.then(result => {
    firstName.value = result.firstName
    lastName.value = result.lastName
    email.value = result.email
})

const editProfileForm = document.querySelector(`#editProfileForm`)

editProfileForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {"Authorization": token}
        })
        .then(result => result.json())
        .then(result => {
            if(result){

                const firstName = document.querySelector(`#firstName`).value
                const lastName = document.querySelector(`#lastName`).value
                const email = document.querySelector(`#email`).value
                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        firstName, lastName, email
                    })
                })
                .then(result => result.json())
                .then(result => {
                    if(result){
                        alert(`${result.firstName} ${result.lastName} account was successfully edited.`)
                        window.location.replace(`./profile.html?userId=${userId}`)
                    }else{
                        return window.location.href = `../../error.html`
                    }
                })
            }else{
                return window.location.href = `../../error.html`
            }
        })
    }else{
        return window.location.href = `../../error.html`
    }
})