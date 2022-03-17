const token = localStorage.getItem(`token`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
    .then(result => result.json())
    .then(result => {
        const bundles = result
        if(token){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {"Authorization": token}
            })
            .then(result => result.json())
            .then(result => {
                if(result.isAdmin){
                    const activeBundlesCount = bundles.filter(bundle => bundle.isActive === true).length
                    if(activeBundlesCount > 0){
                        bundles.map(bundle => {
                            if(bundle.isActive){
                                let total = 0
                                bundle.gamesIncluded.map(game => {
                                    return total += game.price
                                })
                                let discount = 0
                                switch (bundle.gamesIncluded.length) {
                                    case 2:
                                        discount = 5
                                        break;
                                    case 3:
                                        discount = 10
                                        break;
                                    case 5:
                                        discount = 15
                                    default:
                                        break;
                                }
                                const mainContainer = document.querySelector(`.main-container`)
                                const cardContainerBundle = document.createElement(`div`)
                                cardContainerBundle.setAttribute(`class`, `row mx-auto my-5 py-5 justify-content-center align-middle card-container-bundle`)
                                const h2Container = document.createElement(`div`)
                                h2Container.setAttribute(`class`, `text-center pt-5 col-3 h2-container py-3`)
                                const h2 = document.createElement(`h2`)
                                h2.innerText = `${bundle.gamesIncluded.length} GB`
                                const discription = document.createElement(`p`)
                                discription.innerText = `Two Games Bundle with ${discount}% less.`
                                const totalPrice = document.createElement(`s`)
                                totalPrice.innerText = `$${total}`
                                const totalPriceP = document.createElement(`p`)
                                totalPriceP.setAttribute(`class`, `mt-5`)
                                totalPriceP.append(totalPrice)
                                const discountedPrice = document.createElement(`p`)
                                discountedPrice.innerText = `$${bundle.subTotal}`
                                const dFlex = document.createElement(`div`)
                                dFlex.setAttribute(`class`, `d-flex flex-column`)
                                const editBtn = document.createElement(`a`)
                                editBtn.setAttribute(`type`, `button`)
                                editBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3`)
                                editBtn.setAttribute(`href`, `#`)
                                editBtn.innerText= `Edit Bundle`
                                const archiveBtn = document.createElement(`a`)
                                archiveBtn.setAttribute(`type`, `button`)
                                archiveBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3 archive-btn`)
                                archiveBtn.setAttribute(`href`, `#`)
                                archiveBtn.innerText = `Archive`
                                dFlex.append(editBtn, archiveBtn)
                                const gamesContainer = document.createElement(`div`)
                                gamesContainer.setAttribute(`class`, `row text-center col-9`)
                                const h2Container2 = document.createElement(`div`)
                                h2Container2.setAttribute(`class`, `col-12 mb-5`)
                                const h2Title = document.createElement(`h2`)
                                h2Title.innerText = `Games Included`
                                h2Container2.append(h2Title)
                                gamesContainer.append(h2Container2)
                                bundle.gamesIncluded.map(game => {
                                    const gameContainer = document.createElement(`div`)
                                    gameContainer.setAttribute(`class`, `col`)
                                    const img = document.createElement(`img`)
                                    img.setAttribute(`class`, `img-fluid`)
                                    img.setAttribute(`src`, `../../../assets/img/the-witcher-3.jpg`)
                                    const h3 = document.createElement(`h3`)
                                    h3.innerText = `${game.gameName}`
                                    const price = document.createElement(`p`)
                                    price.innerText = `${game.price}`
                                    gameContainer.append(img, h3, price)
                                    gamesContainer.append(gameContainer)
                                })
                                
                                mainContainer.append(cardContainerBundle)
                                cardContainerBundle.append(h2Container, gamesContainer)
                                h2Container.append(h2, discription, totalPriceP, discountedPrice, dFlex)
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No Active Bundles Available`
                    }
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

let params = new URLSearchParams(document.location.search)
const gameId = params.get(`gameId`)
if(gameId){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${gameId}/archive`, {
        method: "PATCH",
        headers: {
            "Authorization": token
        }
    })
    .then(result => result.json())
    .then(result => {
        alert(`${result.gameName} is successfully added to archived games.`)
        window.location.replace(`./admin-view-games.html`)
    })
}
