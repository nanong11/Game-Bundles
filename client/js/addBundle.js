if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                const addGame = document.querySelector(`#addGame`)
                addGame.addEventListener(`click`, () => {
                    const gamesIncluded = document.querySelector(`#gamesIncluded`)
                    const numberOfSelect = gamesIncluded.childElementCount
                    const select = document.createElement(`select`)
                    select.setAttribute(`class`, `form-control mb-3 selectContainer`)
                    if(numberOfSelect < 6){
                        result.map(game => {
                            if(game.isActive){
                                const option = document.createElement(`option`)
                                option.innerText = game.gameName
                                select.append(option)
                                gamesIncluded.append(select)
                            }
                        })
                    }else{
                        alert(`You can only add up to 5 games per bundle.`)
                    }
                })
                const removeGame = document.querySelector(`#removeGame`)
                removeGame.addEventListener(`click`, () => {
                    const gamesIncluded = document.querySelector(`#gamesIncluded`)
                    gamesIncluded.removeChild(gamesIncluded.lastChild)
                })
            })
            
            const addGameForm = document.querySelector(`#addGameForm`)
            
            addGameForm.addEventListener(`submit`, (e) => {
                e.preventDefault()
                const bundleName = document.querySelector(`#bundleName`).value
                const description = document.querySelector(`#description`).value
                const discount = document.querySelector(`#discount`).value
                const gamesIncludedData = document.querySelectorAll(`.selectContainer`)
                const gamesIncludedArr = [...gamesIncludedData].map(games => games.value)
                let gameName = gamesIncludedArr.map(games => games)
                
                fetch(`https://tranquil-caverns-53550.herokuapp.com/api/games/names`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({gameName})
                })
                .then(result => result.json())
                .then(result => {
                        const gamesIncluded = result.filter(game => game.isActive)
                        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/bundles/create`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                bundleName, description, gamesIncluded, discount
                            })
                        })
                        .then(result => result.json())
                        .then(result => {
                            if(result){
                                alert(`${result.bundleName} bundle is succssfully created`)
                                window.location.replace(`./admin-view-bundles.html`)
                            }else{
                                return window.location.href = `../../error.html`
                            }
                        })            
                })
            })
        }else{
            return window.location.href = `../../error.html`
        }
    })
}else{
    window.location.href = `../../error.html`
}

