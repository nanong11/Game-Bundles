const token = localStorage.getItem(`token`)

if(!token){
    const secretAdminLogin = document.querySelector(`#secret-admin-login`)
    secretAdminLogin.addEventListener(`click`, () => {
        fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: `admin@mail.com`,
                password: `123`
            })
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
                alert(`Your are now login as admin.`)
                return window.location.replace(`./pages/sessions/admin/admin.html`)
            })
        }else if(!result){
            return alert(`The email you entered isn't connected to an account.`)
        }else{
            return alert(`The password you've entered is incorrect.`)
        }
        })
    })
}