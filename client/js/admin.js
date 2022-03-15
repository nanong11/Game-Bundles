const token = localStorage.getItem(`token`)

window.addEventListener(`load`, () => {
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users`, {
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result){
                const userCounter = document.querySelector(`#usersCounter`)
                userCounter.innerText = result.length
            }else{
                return window.location.href = `../../error.html`
            }
        })
    }else{
        return window.location.href = `../../error.html`
    }
})