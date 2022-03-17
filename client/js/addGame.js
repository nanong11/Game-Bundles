const token = localStorage.getItem(`token`)
const addGameForm = document.querySelector(`.addGameForm`)

addGameForm.addEventListener(`submit`, (e) => {
    (e).preventDefault()
    const gameName = document.querySelector(`#gameName`).value
    const description = document.querySelector(`#description`).value
    const price = document.querySelector(`#price`).value
    const stock = document.querySelector(`#stock`).value
    
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games`, {
        method: "GET",
        headers: {"Authorization": token}
    })
    .then(result => result.json())
    .then(result => {
        const duplicate = result.filter(game => game.gameName == gameName)
        if(duplicate.length <= 0){
            if(token){
                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                    method: "GET",
                    headers: {"Authorization": token}
        
                })
                .then(result => result.json())
                .then(result => {
                    if(result.isAdmin){
                        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/create`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token
                            },
                            body: JSON.stringify({
                                gameName, description, price, stock
                            })    
                        })
                        .then(result => result.json())
                        .then(result => {
                            if(result){
                                alert(`${result.gameName} successfully added`)
                                window.location.replace(`../admin/admin-view-games.html`)
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
        }else{
            alert(`${gameName} already exist.`)
        }
    })
})