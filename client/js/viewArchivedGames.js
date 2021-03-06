if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        const games = result
        if(token){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(result => result.json())
            .then(result => {
                if(result.isAdmin){
                    const inActiveGamesCount = games.filter(game => game.isActive === false).length
                    if(inActiveGamesCount > 0){
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `Archived Games`
                        games.map(game => {
                            if(game.isActive === false){
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
                                const makeActiveBtn = document.createElement(`a`)
                                makeActiveBtn.innerText = `Make Active`
                                makeActiveBtn.setAttribute(`class`, `btn btn-primary mx-auto make-active-btn mb-3`)
                                makeActiveBtn.setAttribute(`href`, `./admin-view-archived-games.html?gameId=${game._id}`)
                                const deleteBtn = document.createElement(`a`)
                                deleteBtn.innerText = `Delete`
                                deleteBtn.setAttribute(`class`, `btn btn-primary mx-auto delete-btn`)
                                deleteBtn.setAttribute(`href`, `./admin-view-delete-games.html?gameId=${game._id}`)
                                cardBody.append(cardTitle, description, stock, price, makeActiveBtn, deleteBtn)
                                card.append(img, cardBody)
                                cardContainer.append(card)
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No Archived Games`
                    }
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

let params = new URLSearchParams(document.location.search)
const gameId = params.get(`gameId`)
if(gameId){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}/unArchive`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        alert(`${result.gameName} is successfully added to active games.`)
        window.location.replace(`./admin-view-archived-games.html`)
    })
}