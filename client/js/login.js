//API REQUEST
const loginRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/login`
const profile = `https://tranquil-caverns-53550.herokuapp.com/api/users/profile`

//FORM Element
const loginForm = document.querySelector(`#loginForm`)

//Login form onSubmit function
loginForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    const email = document.querySelector(`#email`).value
    const password = document.querySelector(`#password`).value
    
    fetch(loginRequest, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(result => result.json())
    .then(result => {
        const {token} = result //result is object with token property
        if(token != null){ 
            fetch(profile, {
                method: "GET",
                headers: {"Authorization": token}
            })
            .then(result => result.json())
            .then(result => {
                if(result.isAdmin){
                    console.log(result.isAdmin)
                    alert(`Login Seccussful`)
                    return window.location.href = "./sessions/admin/admin.html"
                }else if(!result.isAdmin){
                    alert(`Login Seccussful`)
                    return window.location.href = "./user/user.html"
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