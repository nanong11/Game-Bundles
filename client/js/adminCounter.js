window.addEventListener(`load`, () => {
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users`)
    .then(result => result.json())
    .then(result => {
        const userCounter = document.querySelector(`#usersCounter`)
        userCounter.innerText = result.length
    })
})