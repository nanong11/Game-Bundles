if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        const user = result
        if(user){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/orders`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                const orders = result
                const activeOrders = orders.map(order => !order.complete ? order : false)
                activeOrders.map(order => {
                    if(order.userId == user._id){
                        let cartOrders = 0;
                        cartOrders += order.gamesIncluded.length
                        cartOrders += order.bundlesIncluded.length
                        const cartOrderCounter = document.querySelector(`#cart-order-counter`)
                        cartOrderCounter.innerText = `${cartOrders}`
                    }
                })
            })
        }else{
            window.location.href = `../../error.html`
        }
    })
}