if(token){
    fetch(`https://tranquil-caverns-53550.herokuapp.com/api/users/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json())
    .then(result => {
        if(result.isAdmin){
            const adminProfile = document.querySelector(`#admin-profile`)
            adminProfile.addEventListener(`click`, () => {
                console.log(result)
                window.location.replace(`./admin-profile.html?userId=${result._id}`)
            })
        }else{
            window.location.href = `../../error.html`
        }
    })
}else{
    window.location.href = `../../error.html`
}