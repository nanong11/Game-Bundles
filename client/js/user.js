const token = localStorage.getItem(`token`)
const profile = document.querySelector(`#profile`)

profile.addEventListener(`click`, () => {
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
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