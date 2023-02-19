function quiz(username) {
    // set up html
    document.querySelector("#css").setAttribute("href", "css/quiz.css");
    document.querySelector("#wrapper").classList.add("quizColor")
    document.querySelector("main").innerHTML = `
        <img src="/media/logo.png" id="dogImage">
        <div id="options"></div>
    `
    console.log(document.querySelector("header"));
    document.querySelector("#logout").innerHTML = `
        <p>${username}</p>
        <button>logout</button>
    `

    document.querySelector("#logout button").addEventListener("click", login_register);

    //variabler
    const dogImage = document.querySelector("#dogImage");
    const options = document.querySelector("#options")
    const optionButtons = document.querySelectorAll("#options button");

    const whiteScreen = document.querySelector("#whiteScreen");
    const infoBoxText = document.querySelector("#infoBox > div");
    const infoBoxButton = document.querySelector("#infoBox > button");

    // Getting a random image from server
    async function GettingARandomImage() {
        infoBoxContent("Getting a random image");
        const randomBreed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

        dogImage.setAttribute("src", `${randomBreed.url}`)
        console.log(randomBreed);

        // options.innerHTML = `
        //     <button>${randomBreed.name}</button>
        //     <button>test</button>
        //     <button>test</button>
        //     <button>test</button>
        // `
    }

    // add functionality to buttons
    optionButtons.forEach(button => button.addEventListener("click", checkAnswer));
    function checkAnswer() {
        console.log("hej");
    }

    // content for infobox (w/ option for with or without button)
    function infoBoxContent(content, button) {
        infoBoxText.textContent = content;
        whiteScreen.classList.remove("hide");
        if (button) {
            infoBoxButton.classList.remove("hide");
        }
    }

    GettingARandomImage();
}

// infoBoxButton.addEventListener("click", infoBoxRemove);

// function infoBoxRemove() {
//     whiteScreen.classList.add("hide");
//     infoBoxButton.classList.add("hide");
// }
