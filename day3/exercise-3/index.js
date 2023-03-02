const defaultFill = "#dcdcdc";
let oldTarget;
const fetchData = async (id) => {
    const url = `https://countries.plaul.dk/api/countries/${id}`;
    const res = await fetch(url, {
        method: "GET",
    });
    return res.json();
};

const countryToHtmlString = (country) => {
    return `
        Country: ${country.name.common}
        Member of UN: ${country.unMember}
        Capital: ${country.capital}
        Currencies: ${Object.entries(country.currencies).map(
        (currency) =>
            `(${currency[0]} - Name: ${currency[1].name}, Symbol: ${currency[1].symbol})`
    )}
        `;
};

const populateCountryInfo = (country) => {
    const paragraph = document.getElementById("country-info");
    const htmlString = countryToHtmlString(country);
    paragraph.innerText = htmlString;
};

document.getElementById("country-map").onclick = async (e) => {
    const target = e.target;
    if (target.id === "svg2") return;
    const countryData = await fetchData(target.id);
    target.style.fill = "blue";
    populateCountryInfo(countryData);
    if (oldTarget !== undefined) {
        oldTarget.style.fill = defaultFill;
    }
    oldTarget = target;
};
