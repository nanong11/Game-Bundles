const getAllGamesRequest = `https://tranquil-caverns-53550.herokuapp.com/api/games`
const profile = `https://tranquil-caverns-53550.herokuapp.com/api/users/profile`

const token = localStorage.getItem(`token`)

window.addEventListener(`load`, () => {
    if(token){
        fetch(getAllGamesRequest, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
            const games = result
            if(token){
                fetch(profile, {
                    method: "GET",
                    headers: {"Authorization": token}
                })
                .then(result => result.json())
                .then(result => {
                    if(result.isAdmin){
                        games.map(game => {
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
                            const price = document.createElement(`p`)
                            price.innerText = `$${game.price.toFixed(2)}`
                            const editBtn = document.createElement(`a`)
                            editBtn.innerText = `Edit Details`
                            editBtn.setAttribute(`class`, `btn btn-primary mb-3 mt-auto mx-auto`)
                            editBtn.setAttribute(`href`, `./admin-view-game.html?gameId=${game._id}`)
                            const archiveBtn = document.createElement(`a`)
                            archiveBtn.innerText = `Archive`
                            archiveBtn.setAttribute(`class`, `btn btn-primary mx-auto`)
                            archiveBtn.setAttribute(`href`, `#`)

                            cardBody.append(cardTitle, description, price, editBtn, archiveBtn)
                            card.append(img, cardBody)
                            cardContainer.append(card)
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