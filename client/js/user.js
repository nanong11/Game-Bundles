const findUserRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/profile`
const token = localStorage.getItem(`token`)

const profile = document.querySelector(`#profile`)

profile.addEventListener(`click`, () => {
    if(token){
        fetch(findUserRequest, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
            console.log(result)
            window.location.replace(`./profile.html?userId=${result._id}`)
        })

    }else{
        return window.location.href = `../../error.html`
    }
})