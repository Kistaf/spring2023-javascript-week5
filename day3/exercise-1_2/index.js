const userToHtmlString = (user) => {
    return `
            Name: ${user.name}
            Phone: ${user.phone}

            Address
            Street: ${user.address.street}
            City: ${user.address.city}
            Zip: ${user.address.zipcode}
            Geo: (lat,lng): ${user.address.geo.lat}, ${user.address.geo.lng}
            `;
};
document.getElementById("search-user-button").onclick = async () => {
    const input = document.getElementById("user-input");
    if (input.value === "") return;
    const url = `https://jsonplaceholder.typicode.com/users/${input.value}`;
    const user = await fetchResult(url);
    const paragraph = document.getElementById("fetch-data");
    paragraph.innerText = userToHtmlString(user);
};

const generateUsersTable = (users) => {
    return `
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                ${users
            .map(
                (user) =>
                    `<tr><td>${user.name}</td><td>${user.phone}</td></tr>`
            )
            .join("\n")}
            </tbody>
        </table>
        `;
};

document.getElementById("get-all-users-button").onclick = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const users = await fetchResult(url);
    const paragraph = document.getElementById("fetch-data");
    paragraph.innerHTML = generateUsersTable(users);
};
const fetchResult = async (url) => {
    const res = await fetch(url, {
        method: "GET",
    });
    return res.json();
};
