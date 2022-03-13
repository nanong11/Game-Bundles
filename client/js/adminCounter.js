const getAllUsersRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users`

window.addEventListener(`load`, () => {
    fetch(getAllUsersRequest)
    .then(result => result.json())
    .then(result => {
        const userCounter = document.querySelector(`#usersCounter`)
        userCounter.innerText = result.length
    })
})