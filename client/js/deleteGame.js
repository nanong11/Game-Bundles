let params = new URLSearchParams(document.location.search)
const gameId = params.get(`gameId`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                const game = result
                if(token){
                    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                        method: "GET",
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                    .then(result => result.json())
                    .then(result => {
                        if(result.isAdmin){
                            const cardContainer = document.querySelector(`.card-container`)
                            const card = document.createElement(`div`)
                            card.setAttribute(`class`, `card m-5 p-3`)
                            const img = document.createElement(`img`)
                            img.setAttribute(`class`, `card-img-top`)
                            img.setAttribute(`src`, `../../../assets/img/the-witcher-3.jpg`)
                            const cardBody = document.createElement(`div`)
                            cardBody.setAttribute(`class`, `card-body text-center d-flex flex-column`)
                            const cardTitle = document.createElement(`h5`)
                            cardTitle.setAttribute(`class`, `card-title`)
                            cardTitle.innerText = `${game.gameName}`
                            const description = document.createElement(`p`)
                            description.setAttribute(`class`, `card-text`)
                            description.innerText = `${game.description}`
                            const stock = document.createElement(`p`)
                            stock.innerText = `Stock: ${game.stock}`
                            const price = document.createElement(`p`)
                            price.innerText = `$${game.price.toFixed(2)}`
                            const deleteBtn = document.createElement(`a`)
                            deleteBtn.innerText = `Delete`
                            deleteBtn.setAttribute(`class`, `btn btn-primary mx-auto mt-auto delete-btn`)
                
                            cardBody.append(cardTitle, description, stock, price, deleteBtn)
                            card.append(img, cardBody)
                            cardContainer.append(card)
                
                            const confirmDeleteBtn = document.querySelector(`.delete-btn`)
                            confirmDeleteBtn.addEventListener(`click`, () => {
                                if(gameId){
                                    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}/delete`, {
                                        method: "DELETE",
                                        headers: {
                                            "Authorization": `Bearer ${token}`
                                        }
                                    })
                                    .then(result => result.json())
                                    .then(result => {
                                        alert(`${game.gameName} is successfully deleted.`)
                                        window.location.replace(`./admin-view-archived-games.html`)
                                    })
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
        }else{
            return window.location.href = `../../error.html`
        }
    })
    
}else{
    window.location.href = `../../error.html`
}