let params = new URLSearchParams(document.location.search)
const bundleId = params.get(`bundleId`)

const token = localStorage.getItem(`token`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/${bundleId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        const bundle = result
        if(token){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(result => result.json())
            .then(result => {
                if(result.isAdmin){
                    let total = 0
                    bundle.gamesIncluded.map(game => {
                        return total += game.price
                    })
                    const mainContainer = document.querySelector(`.main-container`)
                    const cardContainerBundle = document.createElement(`div`)
                    cardContainerBundle.setAttribute(`class`, `row mx-auto my-5 py-5 justify-content-center align-middle card-container-bundle`)
                    const h2Container = document.createElement(`div`)
                    h2Container.setAttribute(`class`, `text-center pt-5 col-3 h2-container py-3`)
                    const h2 = document.createElement(`h2`)
                    h2.innerText = `${bundle.bundleName}`
                    const discription = document.createElement(`p`)
                    discription.innerText = `${bundle.description}`
                    const totalPrice = document.createElement(`s`)
                    totalPrice.innerText = `$${total.toFixed(2)}`
                    const totalPriceP = document.createElement(`p`)
                    totalPriceP.setAttribute(`class`, `mt-5`)
                    totalPriceP.append(totalPrice)
                    const discountedPrice = document.createElement(`p`)
                    discountedPrice.innerText = `$${bundle.subTotal.toFixed(2)}`
                    const dFlex = document.createElement(`div`)
                    dFlex.setAttribute(`class`, `d-flex flex-column`)
                    const deleteBtn = document.createElement(`a`)
                    deleteBtn.setAttribute(`type`, `button`)
                    deleteBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3 delete-btn`)
                    deleteBtn.innerText = `Delete`
                    dFlex.append(deleteBtn)
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
                        h3.setAttribute(`class`, `mt-3`)
                        const price = document.createElement(`p`)
                        price.innerText = `$${game.price.toFixed(2)}`
                        price.setAttribute(`class`, `mt-3`)
                        gameContainer.append(img, h3, price)
                        gamesContainer.append(gameContainer)
                    })
                    
                    mainContainer.append(cardContainerBundle)
                    cardContainerBundle.append(h2Container, gamesContainer)
                    h2Container.append(h2, discription, totalPriceP, discountedPrice, dFlex)

                    const confirmDeleteBtn = document.querySelector(`.delete-btn`)
                    confirmDeleteBtn.addEventListener(`click`, () => {
                        if(bundleId){
                            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/${bundleId}/delete`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then(result => result.json())
                            .then(result => {
                                alert(`${bundle.bundleName} bundle is successfully deleted.`)
                                window.location.replace(`./admin-archive-bundle.html`)
                            })
                        }
                    })                    
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