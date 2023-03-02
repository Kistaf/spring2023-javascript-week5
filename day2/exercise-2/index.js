const sayHi = () => {
    // Part 1
    const divs = document.getElementsByClassName("part1");
    for (let div of divs) {
        div.onclick = () => {
            const paragraph = document.getElementById("result");
            // Bad practice
            paragraph.innerText = div.id;
        };
    }
};

const setupOuterEvent = () => {
    const div = document.getElementById("outer");
    div.onclick = (e) => {
        const target = e.target;
        if (target.id !== "outer") {
            const paragraph = document.getElementById("result");
            // Bad practice
            paragraph.innerText = target.id;
        }
    };
};

window.onload = () => {
    // Part 1
    sayHi();

    // Part 2
    setupOuterEvent();
};
