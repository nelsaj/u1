function login_register() {
    // add html
    document.querySelector("#css").setAttribute("href", "css/login_register.css");
    document.querySelector("#logout").innerHTML = "";
    document.querySelector("#wrapper").classList.add("loginColor");
    document.querySelector("main").innerHTML = `
        <h1 id="current_page">LOGIN</h1>
        <div class="userInputs">
            <label for="name">User Name:</label>
            <input name="name" id="name">
        </div>
        <div class="userInputs">
            <label for="pass">Password:</label>
            <input type="password" name="pass" id="pass">
        </div>

        <div id="button">
            <label for="login">Let the magic start!</label>
            <button name="login">Login</button>
        </div>
        
        <div id="loginRegisterContainer">
            <p id="loginRegister">New to this? Register for free.</p>
        </div>
    `

    // variabler för lättare läsning
    const username = document.querySelector("#name");
    const password = document.querySelector("#pass");

    const button = document.querySelector("#button button");
    const loginOrRegister = document.querySelector("#loginRegister");

    const currentPage = document.querySelector("#current_page");
    const flavorText = document.querySelector("#button label");
    const inputs = document.querySelectorAll("input");

    const whiteScreen = document.querySelector("#whiteScreen");

    //click login or register
    button.addEventListener("click", beginLoginRegister);

    async function beginLoginRegister() {
        // const request = new Request();
        infoBoxContent("Contacting server");
        // if screen is register
        if (document.querySelector("#wrapper").classList.contains("registerColor")) {
            const newUser = {
                action: "register",
                user_name: username.value,
                password: password.value,
            }
            const POSTNewUser = {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(newUser)
            }
            const request = new Request(`https://teaching.maumt.se/apis/access/`, POSTNewUser);
            const fetched = await fetch_request(request);
            if (fetched.status === 200) {
                infoBoxContent("New user created!", true);
            } else if (fetched.status === 409) {
                infoBoxContent("Sorry that user is already taken", true);
            } else if (fetched.status === 418) {
                infoBoxContent("The server thinks its a teapot", true);
            } else if (fetched.status === 400) {
                infoBoxContent("Please don't leave any field blank", true);
            }
        } else {
            // if screen is login
            const request = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username.value}&password=${password.value}`);
            const fetched = await fetch_request(request);
            if (fetched.status === 200) {
                quiz(username.value);
            } else if (fetched.status === 404) {
                whiteScreen.classList.add("hide");

                flavorText.textContent = "Username or password incorrect";
                flavorText.style.backgroundColor = "#f4f1de91";
            } else if (fetched.status === 418) {
                infoBoxContent("The server thinks its a teapot", true);
            } else if (fetched.status === 400) {
                infoBoxContent("Please don't leave any field blank", true);
            }
        }
    }

    // choose between login och register screen
    loginOrRegister.addEventListener("click", e => {
        flavorText.removeAttribute("style");

        for (const input of inputs) { input.value = ""; }
        document.querySelector("#wrapper").classList.toggle("loginColor");
        document.querySelector("#wrapper").classList.toggle("registerColor");

        // if screen is register
        if (document.querySelector("#wrapper").classList.contains("registerColor")) {
            currentPage.textContent = "REGISTER";
            flavorText.textContent = "Ready when you are...";
            loginOrRegister.textContent = "Already have an account? Go to login";
            button.textContent = "Register";
        } else {
            // if screen is login
            currentPage.textContent = "LOGIN";
            flavorText.textContent = "Let the magic start!";
            loginOrRegister.textContent = "New to this? Register for free.";
            button.textContent = "Login";
        }
    })
}