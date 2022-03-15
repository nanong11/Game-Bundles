const token = localStorage.getItem(`token`)

window.addEventListener(`load`, () => {
    if(token){
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users`, {
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
            const userCounter = document.querySelector(`#usersCounter`)
            userCounter.innerText = result.length
        })
    }else{
        //Remove elements
        document.querySelector(`.main-container`).remove()
        document.querySelector(`.footer-remove`).remove()
        document.querySelector(`.navbar`).remove()

        //Create new Nav
        const navContainer = document.querySelector(`.nav-container`)
        const nav = document.createElement(`nav`)
        nav.setAttribute(`class`, `navbar navbar-expand-lg justify-content-center`)
        const a = document.createElement(`a`)
        a.setAttribute(`class`, `navbar-brand`)
        a.setAttribute(`href`, `../../../index.html`)
        a.innerText = `Game Bundles`
        nav.append(a)
        navContainer.append(nav)

        //Create new Main
        const main = document.querySelector(`main`)
        const h1 = document.createElement(`h1`)
        h1.innerText = `404`
        h1.setAttribute(`class`, `text-center table-h1 mt-5`)
        const p = document.createElement(`p`)
        p.innerText = `Page not found.`
        p.classList.add(`text-center`)
        main.append(h1,p)

        //Create new Footer
        const footerContainer = document.querySelector(`.footer-container`)
        const h3 = document.createElement(`h6`)
        h3.innerText = `Marc Allen Nanong | All rights reserved 2022`
        h3.setAttribute(`class`, `text-center mb-5`)
        footerContainer.append(h3)
    }
    
})