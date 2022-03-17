const loginForm = document.querySelector(`#loginForm`)

loginForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    const email = document.querySelector(`#email`).value
    const password = document.querySelector(`#password`).value
    
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(result => result.json())
    .then(result => {
        localStorage.setItem(`token`, result.token)
        const {token} = result
        if(token != null){ 
            fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(result => result.json())
            .then(result => {
                if(result.isAdmin){
                    alert(`Login Seccussful`)
                    return window.location.replace(`../pages/sessions/admin/admin.html`)
                }else if(!result.isAdmin){
                    alert(`Login Seccussful`)
                    return window.location.replace("../pages/sessions/user/user.html")
                }else{
                    return alert(`Cannot login. Please try again.`)
                }
            })
        }else if(!result){
            return alert(`The email you entered isn't connected to an account.`)
        }else{
            return alert(`The password you've entered is incorrect.`)
        }
    })
})