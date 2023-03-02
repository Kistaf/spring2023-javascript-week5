const names = ["Lars", "Peter", "Jan", "Ian"];
const setupUl = () => {
    let ul = document.getElementById("names__ul");
    ul.innerHTML = names.map((name) => `<li>${name}</li>`).join("");
};

document.getElementById("remove__first").onclick = () => {
    names.shift();
    setupUl();
};
document.getElementById("remove__last").onclick = () => {
    names.pop();
    setupUl();
};

const setupForm = () => {
    const form = document.querySelector("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.input;
        const value = input.value;
        if (value === "") return;
        addName(value);
        input.value = "";
    };
};

const addName = (name) => {
    names.push(name);
    setupUl();
};

window.onload = () => {
    setupUl();
    setupForm();
};
