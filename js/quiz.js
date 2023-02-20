function quiz(username) {
    // set up html
    document.querySelector("#css").setAttribute("href", "css/quiz.css");
    document.querySelector("#wrapper").classList.add("quizColor")
    document.querySelector("main").innerHTML = `
        <img src="/media/logo.png" id="dogImage">
        <div id="options"></div>
    `
    document.querySelector("#logout").innerHTML = `
        <p>${username}</p>
        <button>logout</button>
    `

    document.querySelector("#logout button").addEventListener("click", login_register);

    //variabler
    const dogImage = document.querySelector("#dogImage");
    const options = document.querySelector("#options")

    const whiteScreen = document.querySelector("#whiteScreen");
    const infoBox = document.querySelector("#infoBox");
    const infoBoxText = document.querySelector("#infoBox > div");
    const infoBoxButton = document.querySelector("#infoBox > button");

    // Getting a random image from server
    async function GettingARandomImage() {
        let possiblePositions = ["one", "two", "three", "four"];

        dogImage.setAttribute("src", "/media/logo.png")

        infoBoxContent("Getting a random image");
        const randomBreed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

        let image = await (await fetch_request(`https://dog.ceo/api/breed/${randomBreed.url}/images/random`)).json();
        dogImage.setAttribute("src", `${image.message}`)
        whiteScreen.classList.add("hide");

        options.innerHTML = `
            <button id="one"></button>
            <button id="two"></button>
            <button id="three"></button>
            <button id="four"></button>
        `
        // put in random position
        const randomNumber = Math.floor(Math.random() * possiblePositions.length);
        const randomPosition = possiblePositions[randomNumber];
        document.querySelector(`#${randomPosition}`).textContent = `${randomBreed.name}`
        possiblePositions.splice(randomNumber, 1);

        for (const position of possiblePositions) {
            let wrongBreed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

            if (wrongBreed.name === randomBreed.name) {
                console.log("ALERT");
                GettingARandomImage();
            } else {
                document.querySelector(`#${position}`).textContent = `${wrongBreed.name}`;
            }
        }

        const optionButtons = document.querySelectorAll("#options button");

        console.log(randomBreed);

        // add functionality to buttons
        optionButtons.forEach(button => button.addEventListener("click", checkAnswer));
        function checkAnswer(e) {
            console.log(e.target.textContent);

            if (e.target.textContent === randomBreed.name) {
                infoBoxContent("Correct!", true);
                infoBox.style.backgroundColor = "green";
            } else {
                infoBoxContent("False!", true);
                infoBox.style.backgroundColor = "red";
            }
        }
    }
    GettingARandomImage();

    // content for infobox (w/ option for with or without button)
    function infoBoxContent(content, button) {
        infoBoxText.textContent = content;
        whiteScreen.classList.remove("hide");
        if (button) {
            infoBoxButton.classList.remove("hide");
        }
    }

    infoBoxButton.addEventListener("click", infoBoxRemove);

    function infoBoxRemove() {
        whiteScreen.classList.add("hide");
        infoBoxButton.classList.add("hide");

        infoBox.style.backgroundColor = "";

        GettingARandomImage();
    }
}
