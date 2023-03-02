const cars = [
    { id: 1, year: 1997, make: "Ford", model: "E350", price: 4900 },
    { id: 2, year: 1999, make: "Chevy", model: "Venture", price: 3000 },
    { id: 3, year: 2000, make: "Chevy", model: "Venture", price: 5000 },
    {
        id: 4,
        year: 1996,
        make: "Jeep",
        model: "Grand Cherokee",
        price: 4799,
    },
    { id: 5, year: 2005, make: "Volvo", model: "V70", price: 44799 },
];

const arrToHtmlString = (carArr) => {
    return carArr
        .map(
            (car) =>
                `<tr><td>${car.id}</td><td>${car.year}</td><td>${car.make}</td><td>${car.model}</td><td>${car.price}</td></tr>`
        )
        .join("\n");
};

const populateTable = (htmlString) => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = htmlString;
};

const clearFilter = () => {
    const htmlString = arrToHtmlString(cars);
    populateTable(htmlString);
};

document.getElementById("filter-button").onclick = () => {
    const input = document.getElementById("filter-input");
    if (input.value === "") {
        clearFilter();
        return;
    }
    const filteredArr = cars.filter((car) => car.price < input.value);
    const htmlString = arrToHtmlString(filteredArr);
    populateTable(htmlString);
};

let sortMode = "ascending";
const sort = () => {
    let sorted;
    if (sortMode === "ascending") {
        sorted = cars.sort((a, b) => {
            return a.price - b.price;
        });
        sortMode = "descending";
    } else {
        sorted = cars.sort((a, b) => {
            return b.price - a.price;
        });
        sortMode = "ascending";
    }
    const string = arrToHtmlString(sorted);
    populateTable(string);
};

window.onload = () => {
    const htmlString = arrToHtmlString(cars);
    populateTable(htmlString);
};
