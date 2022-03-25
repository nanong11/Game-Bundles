let params = new URLSearchParams(document.location.search)
const userId = params.get(`userId`)
const bundleId = params.get(`bundleId`)
const gameId = params.get(`gameId`)


if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin == false){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                const orders = result
                if(orders.length > 0){
                    const cartContainer = document.querySelector(`#cart-container`)
                    const userOrder = orders.filter(order => {
                        if(order.complete == false && order.userId == userId){
                            return order
                        }
                    })
                    if(userOrder.length > 0){
                        userOrder.map(order => {
                            if(order.gamesIncluded.length == 0 && order.bundlesIncluded.length == 0){
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders/${order._id}/delete`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                })
                                .then(result => result.json())
                                .then(result => {
                                    window.location.replace(`./user-cart.html?userId=${userId}`)
                                })
                            }
                            if(bundleId){
                                const bundlesIncluded = {bundleId}
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders/${order._id}/removeFromCart`, {
                                    method: "PUT",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        bundlesIncluded
                                    })
                                })
                                .then(result => result.json())
                                .then(result => {
                                    alert(`Successfully remove from cart`)
                                    window.location.replace(`./user-cart.html?userId=${userId}`)
                                })
                            }
                            if(gameId){
                                const gamesIncluded = {gameId}
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders/${order._id}/removeFromCart`, {
                                    method: "PUT",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        gamesIncluded
                                    })
                                })
                                .then(result => result.json())
                                .then(result => {
                                    alert(`Successfully remove from cart`)
                                    window.location.replace(`./user-cart.html?userId=${userId}`)
                                })
                            }
                            let total = 0;
                            order.bundlesIncluded.map(bundle => {
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/${bundle.bundleId}`,{
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                })
                                .then(result => result.json())
                                .then(result => {
                                    const bundle = result
        
                                    const cartItemContainer = document.createElement(`div`)
                                    cartItemContainer.setAttribute(`class`, `col-12 d-flex cart-item-container`)
                                    
                                    const cartItemImgContainer = document.createElement(`div`)
                                    cartItemImgContainer.setAttribute(`class`, `d-flex justify-content-center align-content-center mr-4`)
                                    const cartItemImg = document.createElement(`img`)
                                    cartItemImg.setAttribute(`class`, `img-fluid rounded item-picture my-auto`)
                                    cartItemImg.setAttribute(`src`, `../../../assets/img/the-witcher-3.jpg`)
                                    cartItemImgContainer.append(cartItemImg)
            
                                    const cartItemTitleContainer = document.createElement(`div`)
                                    cartItemTitleContainer.setAttribute(`class`, `item-details  d-flex flex-column py-3 mr-auto`)
                                    const cartItemTitle = document.createElement(`h5`)
                                    cartItemTitle.setAttribute(`class`, `m-0 mt-auto`)
                                    cartItemTitle.setAttribute(`id`, `item-title`)
                                    cartItemTitle.innerText = `${bundle.bundleName}`
                                    cartItemTitleContainer.append(cartItemTitle)
            
                                    const cartItemPriceContainer = document.createElement(`div`)
                                    cartItemPriceContainer.setAttribute(`class`, `item-price d-flex justify-content-center align-content-center py-3`)
                                    const cartItemPrice = document.createElement(`h5`)
                                    cartItemPrice.setAttribute(`class`, `m-auto text-center`)
                                    cartItemPrice.setAttribute(`id`, `item-price`)
                                    cartItemPrice.innerText = `$${bundle.subTotal.toFixed(2)}`
                                    const cartItemRmvBtn = document.createElement(`a`)
                                    cartItemRmvBtn.setAttribute(`class`, `btn`)
                                    cartItemRmvBtn.setAttribute(`type`, `button`)
                                    cartItemRmvBtn.setAttribute(`id`, `cart-item-remove-btn`)
                                    cartItemRmvBtn.setAttribute(`href`, `./user-cart.html?userId=${userId}&bundleId=${bundle._id}`)
                                    cartItemRmvBtn.innerText = `-`
                                    cartItemPriceContainer.append(cartItemPrice, cartItemRmvBtn)
            
                                    cartItemContainer.append(cartItemImgContainer, cartItemTitleContainer, cartItemPriceContainer)
                                    cartContainer.append(cartItemContainer)
            
                                    total += bundle.subTotal
                                    const totaPrice = document.querySelector(`#total-price`)
                                    totaPrice.innerText = `$${total.toFixed(2)}`
                                })
                                                   
                            })
                            
                            order.gamesIncluded.map(game => {
                                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/${game.gameId}`,{
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                })
                                .then(result => result.json())
                                .then(result => {
                                    const game = result
            
                                    const cartItemContainer = document.createElement(`div`)
                                    cartItemContainer.setAttribute(`class`, `col-12 d-flex cart-item-container`)
                                    
                                    const cartItemImgContainer = document.createElement(`div`)
                                    cartItemImgContainer.setAttribute(`class`, `d-flex justify-content-center align-content-center mr-4`)
                                    const cartItemImg = document.createElement(`img`)
                                    cartItemImg.setAttribute(`class`, `img-fluid rounded item-picture my-auto`)
                                    cartItemImg.setAttribute(`src`, `../../../assets/img/the-witcher-3.jpg`)
                                    cartItemImgContainer.append(cartItemImg)
            
                                    const cartItemTitleContainer = document.createElement(`div`)
                                    cartItemTitleContainer.setAttribute(`class`, `item-details  d-flex flex-column py-3 mr-auto`)
                                    const cartItemTitle = document.createElement(`h5`)
                                    cartItemTitle.setAttribute(`class`, `m-0 mt-auto`)
                                    cartItemTitle.setAttribute(`id`, `item-title`)
                                    cartItemTitle.innerText = `${game.gameName}`
                                    cartItemTitleContainer.append(cartItemTitle)
            
                                    const cartItemPriceContainer = document.createElement(`div`)
                                    cartItemPriceContainer.setAttribute(`class`, `item-price d-flex justify-content-center align-content-center py-3`)
                                    const cartItemPrice = document.createElement(`h5`)
                                    cartItemPrice.setAttribute(`class`, `m-auto text-center`)
                                    cartItemPrice.setAttribute(`id`, `item-price`)
                                    cartItemPrice.innerText = `$${game.price.toFixed(2)}`
                                    const cartItemRmvBtn = document.createElement(`a`)
                                    cartItemRmvBtn.setAttribute(`class`, `btn`)
                                    cartItemRmvBtn.setAttribute(`type`, `button`)
                                    cartItemRmvBtn.setAttribute(`id`, `cart-item-remove-btn`)
                                    cartItemRmvBtn.setAttribute(`href`, `./user-cart.html?userId=${userId}&gameId=${game._id}`)
                                    cartItemRmvBtn.innerText = `-`
                                    cartItemPriceContainer.append(cartItemPrice, cartItemRmvBtn)
            
                                    cartItemContainer.append(cartItemImgContainer, cartItemTitleContainer, cartItemPriceContainer)
                                    cartContainer.append(cartItemContainer)
            
                                    total += game.price
                                    const totaPrice = document.querySelector(`#total-price`)
                                    totaPrice.innerText = `$${total.toFixed(2)}`
                                })
                            })
                            
                            
                        })
                    }else{
                        const cartTotalContainer = document.querySelector(`#cart-total-container`)
                        cartTotalContainer.setAttribute(`class`, `d-none`)
                        const cartIsEmpty = document.querySelector(`#cart-is-empty`)
                        cartIsEmpty.classList.remove(`d-none`)
                    }
                }else{
                    const cartTotalContainer = document.querySelector(`#cart-total-container`)
                    cartTotalContainer.setAttribute(`class`, `d-none`)
                    const cartIsEmpty = document.querySelector(`#cart-is-empty`)
                    cartIsEmpty.classList.remove(`d-none`)
                }
            })                     
        }else{
            return window.location.href = `../../error.html`            
        }
    })
}else{
    window.location.href = `../../error.html`
}
    