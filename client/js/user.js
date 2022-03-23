const profile = document.querySelector(`#profile`)
const userCart = document.querySelector(`#user-cart`)

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
            window.location.replace(`./profile.html?userId=${result._id}`)
        })
    }else{
        return window.location.href = `../../error.html`
    }
})

userCart.addEventListener(`click`, () => {
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => result.json())
        .then(result => {
            window.location.replace(`./user-cart.html?userId=${result._id}`)
        })
    }else{
        return window.location.href = `../../error.html`
    }
})