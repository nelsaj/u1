function quiz(username) {
    // save to local storage so correct site will load upon reload
    localStorage.setItem("status", "loggedin");
    localStorage.setItem("username", username);

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

    document.querySelector("#logout button").addEventListener("click", logOut);
    function logOut() {
        localStorage.clear();
        infoBoxButton.removeEventListener("click", GettingARandomImage);
        login_register();
    };

    //variabler
    const dogImage = document.querySelector("#dogImage");
    const options = document.querySelector("#options")

    const whiteScreen = document.querySelector("#whiteScreen");
    const infoBox = document.querySelector("#infoBox");
    const infoBoxButton = document.querySelector("#infoBox > button");

    // Getting a random image from server
    GettingARandomImage();
    async function GettingARandomImage() {
        dogImage.setAttribute("src", "media/logo.png");

        infoBoxContent("Getting a random image");
        let everyBreed = ALL_BREEDS.map(breed => breed);
        const randomBreed = everyBreed[Math.floor(Math.random() * ALL_BREEDS.length)];
        everyBreed.splice(randomBreed, 1);

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
        let possiblePositions = ["one", "two", "three", "four"];

        const randomNumber = Math.floor(Math.random() * possiblePositions.length);
        const randomPosition = possiblePositions[randomNumber];
        document.querySelector(`#${randomPosition}`).textContent = `${randomBreed.name}`
        possiblePositions.splice(randomNumber, 1);

        for (const position of possiblePositions) {
            let wrongBreed = everyBreed[Math.floor(Math.random() * everyBreed.length)];
            everyBreed.splice(randomBreed, 1);

            document.querySelector(`#${position}`).textContent = `${wrongBreed.name}`;
        }

        const optionButtons = document.querySelectorAll("#options button");

        // add functionality to buttons
        optionButtons.forEach(button => button.addEventListener("click", checkAnswer));
        function checkAnswer(e) {
            if (e.target.textContent === randomBreed.name) {
                infoBoxContent("Correct!", true);
                infoBox.style.backgroundColor = "#76c893";
            } else {
                infoBoxContent(`Wrong! The correct answer was ${randomBreed.name}.`, true);
                infoBox.style.backgroundColor = "#e07a5f";
            }
        }
    }

    // infobox
    infoBoxButton.addEventListener("click", GettingARandomImage);
}
