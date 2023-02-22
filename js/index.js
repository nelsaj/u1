if (localStorage.getItem("status")) {
    quiz(localStorage.getItem("username"));
} else {
    login_register();
};

// infobox
document.querySelector("#infoBox > button").addEventListener("click", infoBoxRemove);

function infoBoxContent(content, button) {
    document.querySelector("#infoBox > div").textContent = content;
    document.querySelector("#whiteScreen").classList.remove("hide");
    if (button) {
        document.querySelector("#infoBox > button").classList.remove("hide");
    }
}

function infoBoxRemove() {
    document.querySelector("#whiteScreen").classList.add("hide");
    document.querySelector("#infoBox > button").classList.add("hide");

    document.querySelector("#infoBox").removeAttribute("style");
}