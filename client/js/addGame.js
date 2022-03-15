const addGameForm = document.querySelector(`.addGameForm`)
const addGameRequest = `https://tranquil-caverns-53550.herokuapp.com/api/games/create`

const token = localStorage.getItem(`token`)

addGameForm.addEventListener(`submit`, (e) => {
    (e).preventDefault()
    const gameName = document.querySelector(`#gameName`).value
    const description = document.querySelector(`#description`).value
    const price = document.querySelector(`#price`).value
    const stock = document.querySelector(`#stock`).value
    
    if(token){
        fetch(addGameRequest, {
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