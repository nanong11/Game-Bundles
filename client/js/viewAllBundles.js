let params = new URLSearchParams(document.location.search)
const bundleId = params.get(`bundleId`)

if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        const bundles = result
        if(token){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(result => result.json())
            .then(result => {
                const user = result
                if(user.isAdmin){
                    const activeBundlesCount = bundles.filter(bundle => bundle.isActive === true).length
                    if(activeBundlesCount > 0){
                        const bundleTitle = document.querySelector(`.bundle-title`)
                        bundleTitle.innerText = `ACTIVE BUNDLES`
                        bundles.map(bundle => {
                            if(bundle.isActive){
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
                                const editBtn = document.createElement(`a`)
                                editBtn.setAttribute(`type`, `button`)
                                editBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3`)
                                editBtn.setAttribute(`href`, `./admin-view-bundle.html?bundleId=${bundle._id}`)
                                editBtn.innerText= `Edit Bundle`
                                const archiveBtn = document.createElement(`a`)
                                archiveBtn.setAttribute(`type`, `button`)
                                archiveBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3 archive-btn`)
                                archiveBtn.setAttribute(`href`, `./admin-view-bundles.html?bundleId=${bundle._id}`)
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
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No More Active Bundles`
                    }
                    if(bundleId){
                        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/${bundleId}/archive`, {
                            method: "PATCH",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(result => result.json())
                        .then(result => {
                            alert(`${result.bundleName} is successfully added to archived bundles.`)
                            window.location.replace(`./admin-view-bundles.html`)
                        })
                    }
                }else if(user.isAdmin == false){
                    const activeBundlesCount = bundles.filter(bundle => bundle.isActive === true).length
                    if(activeBundlesCount > 0){
                        const bundleTitle = document.querySelector(`.bundle-title`)
                        bundleTitle.innerText = `CHOOSE YOUR BUNDLES`
                        bundles.map(bundle => {
                            if(bundle.isActive){
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
                                const addToCartBtn = document.createElement(`a`)
                                addToCartBtn.setAttribute(`type`, `button`)
                                addToCartBtn.setAttribute(`class`, `btn btn-info mx-auto mt-3`)
                                addToCartBtn.setAttribute(`href`, `./user-view-allBundles.html?bundleId=${bundle._id}`)
                                addToCartBtn.innerText= `Add to cart`
                                
                                dFlex.append(addToCartBtn)
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
                            }
                        })
                    }else{
                        const h1 = document.querySelector(`.admin-dashboard`)
                        h1.innerText = `No More Available Bundles`
                    }
                    if(bundleId){
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
                                const gamesIncluded = []
                                const bundlesIncluded = [{bundleId}]
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
                                    window.location.replace(`./user-view-allBundles.html`)
                                })
                            }else{
                                orders.map(order => {
                                    const gamesIncluded = []
                                    const bundlesIncluded = [{bundleId}]
                                    if(order.complete == false && order.userId == user._id){
                                        let ordersBundlesIncludedIds = order.bundlesIncluded.map(bundle => bundle.bundleId)
                                        if(ordersBundlesIncludedIds.indexOf(bundleId) == -1){
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
                                                    window.location.replace(`./user-view-allBundles.html`)
                                                }
                                            })
                                        }else{
                                            alert(`Item already in the cart`)
                                            window.location.replace(`./user-view-allBundles.html`)
                                        }
                                    }
                                })
                            }
                        })
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



