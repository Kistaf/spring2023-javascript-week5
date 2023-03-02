const setColors = () => {
    const elements = document.querySelectorAll("div");
    for (let element of elements) {
        element.style.backgroundColor = "blue";
    }
};

const pickRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const generateButton = () => {
    const button = document.createElement("button");
    button.innerText = "Change colors";
    button.onclick = () => {
        const elements = document.querySelectorAll("div");
        const colors = ["red", "green", "lime", "black", "pink", "purple"];
        for (let element of elements) {
            const randomColor = pickRandomElement(colors);
            element.style.backgroundColor = randomColor;
        }
    };
    document.querySelector("body").appendChild(button);
};
window.onload = () => {
    setColors();
    generateButton();
};

