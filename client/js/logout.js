const logout = document.querySelector(`#logout`)

logout.addEventListener(`click`, () => {
    localStorage.clear()
})