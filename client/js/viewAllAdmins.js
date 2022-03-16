//HEROKU HOSTED
const getAllAdminRequest = `https://tranquil-caverns-53550.herokuapp.com/api/users/admins`
//LOCAL HOSTED
// const getAllAdminRequest = `http://localhost:3011/api/users/admins`

const token = localStorage.getItem(`token`)

window.addEventListener(`load`, () => {
    if(token){
        fetch(getAllAdminRequest, {
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
                    tdFullName.innerText = `${user.firstName} ${user.lastName}`;
                    tdFullName.classList.add(`fullName`);

                    let tdViewButton = document.createElement(`td`);
                    tdViewButton.classList.add(`text-center`)

                    let viewButton = document.createElement(`a`)
                    viewButton.innerText = `view`
                    viewButton.classList.add(`btn`, `viewButton`);
                    viewButton.setAttribute(`href`, `./admin-view-admin.html?userId=${user._id}`)
                    
                    tdViewButton.append(viewButton)
                    table.append(tbody);
                    tbody.append(tr);
                    tr.append(th);
                    tr.append(tdFullName);
                    tr.append(tdViewButton);
                });
            }else{
                return window.location.href = `../../error.html`
            }
        })  
    }else{
        return window.location.href = `../../error.html`
    }
})