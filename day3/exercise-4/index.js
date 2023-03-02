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

const findMemberById = async (id) => {
    const paragraph = document.getElementById('single-member-result')
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
    findMemberById(input.value)
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
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(await res.json())
}



