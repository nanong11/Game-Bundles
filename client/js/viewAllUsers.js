//HEROKU HOSTED
const getAllUsersRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users`
//LOCAL HOSTED
// const getAllUsersRequest = `http://localhost:3011/api/users`

const token = localStorage.getItem(`token`)

window.addEventListener(`load`, (e) => {
    if(token){
        fetch(getAllUsersRequest, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        .then(result => result.json())
        .then(result => {
            let table = document.querySelector(`.table`)
            let tbody = document.createElement(`tbody`)
            if(result){
                result.map(user => {
                    let tr =  document.createElement(`tr`);
                    tr.classList.add(`table-row`)
                    let th = document.createElement(`th`);
                    th.innerText = result.indexOf(user) + 1;
                    th.setAttribute(`scope`, `row`);
                    let tdFullName = document.createElement(`td`);
                    let tdViewButton = document.createElement(`td`);
                    tdFullName.innerText = `${user.firstName} ${user.lastName}`;
                    tdFullName.classList.add(`fullName`);
                    let viewButton = document.createElement(`button`)
                    viewButton.innerText = `view`
                    viewButton.classList.add(`btn`, `viewButton`);
                    tdViewButton.classList.add(`text-center`)
                    tdViewButton.append(viewButton)
                    table.append(tbody);
                    tbody.append(tr);
                    tr.append(th);
                    tr.append(tdFullName);
                    tr.append(tdViewButton);
                });
            }else{
                //Remove elements
                window.location.href = `../../error.html`
            }
        })  
    }else{
        //Remove elements
        window.location.href = `../../error.html`
    }
    
})