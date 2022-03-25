if (token) {
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            return window.location.replace(`./pages/sessions/admin/admin.html`)
        }else if(result.isAdmin == false){
            return window.location.replace("./pages/sessions/user/user.html")
        }
    })    
}