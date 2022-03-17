const token = localStorage.getItem(`token`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users`, {
                headers: {
                    "Authorization": `Bearer ${token}`
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
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/isActive`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                if(result){
                    const gamesCounter = document.querySelector(`#gamesCounter`)
                    gamesCounter.innerText = result.length
                }else{
                    return window.location.href = `../../error.html`
                }
            })
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/admins`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                if(result){
                    const adminCounter = document.querySelector(`#adminCounter`)
                    adminCounter.innerText = result.length
                }else{
                    return window.location.href = `../../error.html`
                }
            })
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/isActive`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                if(result){
                    const bundlesCounter =document.querySelector(`#bundlesCounter`)
                    bundlesCounter.innerText = result.length
                }else{
                    window.location.href = `../../error.html`
                }
            })
        }else{
            window.location.href = `../../error.html`
        }
    })
}else{
    window.location.href = `../../error.html`
}
