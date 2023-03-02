const fetchData = async (url, method) => {
    const res = await fetch(url, {
        method: method,
    })
    return {
        status: res.status,
        result: await res.json()
    }
}



const buildHtmlString = (content) => {
    return `
    <table class="table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Resv. count</th>
            </tr>
        </thead>
        <tbody>${content}</tbody>
    </table>
    `
}

const showAllMembers = async () => {
    const url = "http://localhost:8080/api/members"
    const { status, result } = await fetchData(url, "GET")
    if (status !== 200) {
        return
    }
    const paragraph = document.getElementById('all-members-result')
    const content = result.map(member => `<tr><td>${member.username}</td><td>${member.email}</td><td>${member.city}</td><td>${member.reservations !== undefined ? member.reservations.length : 0}</td></tr>`).join("\n")
    const htmlString = buildHtmlString(content)
    paragraph.innerHTML = htmlString;
}

const findMemberById = async (id, paragraphId) => {
    const paragraph = document.getElementById(paragraphId)
    const url = `http://localhost:8080/api/members/${id}`
    const { status, result } = await fetchData(url, "GET")
    if (status !== 200) {
        paragraph.innerText = "Invalid username. Could not fetch"
        return
    }
    const content = `<tr><td>${result.username}</td><td>${result.email}</td><td>${result.city}</td><td>${result.reservations !== undefined ? result.reservations.length : 0}</td></tr>`
    const htmlString = buildHtmlString(content)
    paragraph.innerHTML = htmlString
}


document.getElementById('btn-get-all').onclick = showAllMembers
document.getElementById('single-member-btn').onclick = () => {
    const input = document.getElementById("text-for-username")
    if (input.value === "") return;
    findMemberById(input.value, 'single-member-result')
}

document.getElementById('new-member-form').onsubmit = async (e) => {
    e.preventDefault()
    const form = document.getElementById('new-member-form')
    const username = form.input_username_new;
    const password = form.input_password_new;
    const email = form.input_email_new;
    if (username.value === "" || password.value === "" || email.value === "") {
        return
    }
    const body = {
        username: username.value,
        password: password.value,
        email: email.value
    }

    const url = `http://localhost:8080/api/members`
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const paragraph = document.getElementById('new-member-result')
    if (res.status !== 200) {
        paragraph.innerText = "Failed to create a new member"
        return
    }
    const data = await res.json()
    paragraph.innerText = `
    Username: ${data.username}
    Email: ${data.email}
    `
    await showAllMembers()
}


document.getElementById('fetch_car_to_edit_form').onsubmit = async (e) => {
    e.preventDefault()
    const form = document.getElementById('fetch_car_to_edit_form')
    const inputField = form.edit_car_id
    const update_form = document.getElementById('update_car_form')
    if (inputField.value === "") return
    const res = await fetch('http://localhost:8080/api/cars/' + inputField.value, {
        method: "GET"
    })
    document.getElementById('updated').innerText = ''
    if (res.status !== 200) {
        update_form.innerText = "Failed to fetch the car"
        return
    }
    const data = await res.json()
    update_form.innerHTML = `
        <input hidden id="id" value=${data.id} />
        <div><label for="brand">Brand</label><input id="brand" value=${data.brand} /></div>
        <div><label for="model">Model</label><input id="model" value=${data.model} /></div>
        <div><label for="pricePrDay">Price Pr Day</label><input id="pricePrDay" value=${data.pricePrDay} /></div>
        <button>Change</button>
    `
}

document.getElementById('update_car_form').onsubmit = async (e) => {
    e.preventDefault()
    const form = document.getElementById('update_car_form')
    const id = form.id
    const brand = form.brand
    const model = form.model
    const pricePrDay = form.pricePrDay
    const body = {
        id: id.value,
        brand: brand.value,
        model: model.value,
        pricePrDay: pricePrDay.value
    }
    const res = await fetch('http://localhost:8080/api/cars', {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const showResult = document.getElementById('updated')
    if (res.status !== 200) {
        showResult.innerText = "Failed to update values"
        return
    }
    const data = await res.json()
    form.innerHTML = ''
    showResult.innerHTML = `
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price Pr Day</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${data.id}</td>
                <td>${data.brand}</td>
                <td>${data.model}</td>
                <td>${data.pricePrDay}</td>
            </tr>
        </tbody>
    </table>
    `
}


