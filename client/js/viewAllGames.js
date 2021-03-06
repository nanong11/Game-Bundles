let params = new URLSearchParams(document.location.search)
const gameId = params.get(`gameId`)

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
                const user = result
                if(user.isAdmin){
                    const activeGamesCount = games.filter(game => game.isActive === true).length
                    if(activeGamesCount > 0){
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `Active Games`
                        games.map(game => {
                            if(game.isActive){
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
                                const editBtn = document.createElement(`a`)
                                editBtn.innerText = `Edit Details`
                                editBtn.setAttribute(`class`, `btn btn-primary mb-3 mt-auto mx-auto`)
                                editBtn.setAttribute(`href`, `./admin-view-game.html?gameId=${game._id}`)
                                const archiveBtn = document.createElement(`a`)
                                archiveBtn.innerText = `Archive`
                                archiveBtn.setAttribute(`class`, `btn btn-primary mx-auto archive-btn`)
                                archiveBtn.setAttribute(`href`, `./admin-view-games.html?gameId=${game._id}`)
    
                                cardBody.append(cardTitle, description, stock, price, editBtn, archiveBtn)
                                card.append(img, cardBody)
                                cardContainer.append(card)
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No Active Games Available`
                    }
                    if(gameId){
                        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}/archive`, {
                            method: "PATCH",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(result => result.json())
                        .then(result => {
                            alert(`${result.gameName} is successfully added to archived games.`)
                            window.location.replace(`./admin-view-games.html`)
                        })
                    }
                }else if(user.isAdmin == false){
                    const activeGamesCount = games.filter(game => game.isActive === true).length
                    if(activeGamesCount > 0){
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `CHOOSE YOUR GAMES`
                        games.map(game => {
                            if(game.isActive){
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
                                const addToCartBtn = document.createElement(`a`)
                                addToCartBtn.innerText = `Add to cart`
                                addToCartBtn.setAttribute(`class`, `btn btn-primary mb-auto mx-auto`)
                                addToCartBtn.setAttribute(`href`, `./user-view-allGames.html?gameId=${game._id}`)
    
                                cardBody.append(cardTitle, description, stock, price, addToCartBtn)
                                card.append(img, cardBody)
                                cardContainer.append(card)
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No Games Available as of now`
                    }
                    if(gameId){
                        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders`, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(result => result.json())
                        .then(result => {
                            const orders = result
                            let pendingOrdersUserId = []
                            orders.map(order => {
                                if(order.complete == false){
                                    pendingOrdersUserId.push(order.userId)
                                }
                            })
                            if(pendingOrdersUserId.indexOf(user._id) == -1){
                                const userId = user._id
                                const gamesIncluded = [{gameId}]
                                const bundlesIncluded = []
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders/create`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        userId,
                                        gamesIncluded,
                                        bundlesIncluded
                                    })
                                })
                                .then(result => result.json())
                                .then(result => {
                                    alert(`Successfully added to cart`)
                                    window.location.replace(`./user-view-allGames.html`)
                                })
                            }else{
                                orders.map(order => {
                                    const gamesIncluded = [{gameId}]
                                    const bundlesIncluded = []
                                    if(order.complete == false && order.userId == user._id){
                                        let ordersGamesIncludedIds = order.gamesIncluded.map(game => game.gameId)
                                        if(ordersGamesIncludedIds.indexOf(gameId) == -1){
                                            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders/${order._id}/adToCart`, {
                                                method: "PUT",
                                                headers: {
                                                    "Authorization": `Bearer ${token}`,
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    gamesIncluded,
                                                    bundlesIncluded
                                                })
                                            })
                                            .then(result => result.json())
                                            .then(result => {
                                                if(result){
                                                    alert(`Successfully added to cart`)
                                                    window.location.replace(`./user-view-allGames.html`)
                                                }
                                            })
                                        }else{
                                            alert(`Item already in the cart`)
                                            window.location.replace(`./user-view-allGames.html`)
                                        }
                                    }
                                })
                            }
                        })
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
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/isActive`)
    .then(result => result.json())
    .then(result => {
        const activeGames = result
        if(activeGames.length > 0){
            const h1 = document.querySelector(`.admin-dashboard`)
            h1.innerText = `CHOOSE YOUR GAMES`
            activeGames.map(game => {
                const cardContainer = document.querySelector(`.card-container`)
                const card = document.createElement(`div`)
                card.setAttribute(`class`, `card m-5 p-3`)
                const img = document.createElement(`img`)
                img.setAttribute(`class`, `card-img-top`)
                img.setAttribute(`src`, `../assets/img/the-witcher-3.jpg`)
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
                const addToCartBtn = document.createElement(`a`)
                addToCartBtn.innerText = `Add to cart`
                addToCartBtn.setAttribute(`class`, `btn btn-primary mb-auto mx-auto`)
                
                cardBody.append(cardTitle, description, stock, price, addToCartBtn)
                card.append(img, cardBody)
                cardContainer.append(card)
                addToCartBtn.addEventListener(`click`, () => {
                    alert(`Please login first or create an account.`)
                })
            })
        }else{
            const h1 = document.querySelector(`.admin-dashboard`)
            h1.innerText = `No Games Available as of now`
        }
    })
}