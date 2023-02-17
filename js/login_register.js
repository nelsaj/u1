function login_register() {
    document.querySelector("#css").setAttribute("href", "css/login_register.css");
    document.querySelector("#wrapper").classList.add("coral");
    document.querySelector("#wrapper").innerHTML = `
        <div id="whiteScreen" class="hide">    
            <div id="infoBox">
                <div></div>
                <button class="hide">CLOSE</button>
            </div>
        </div>
    
        <header>
            <div class="logo"></div>
            <div>Dog Breed Quiz</div>
        </header>
    
        <main>
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
        </main>
    
        <footer>
            <p>The Dog Breed Quiz is made possible thanks to the free APi by <a href="">DOG CEO Zine</a></p>
        </footer>
    `;

    // variabler för lättare läsning
    const username = document.querySelector("#name");
    const password = document.querySelector("#pass");

    const button = document.querySelector("#button button");
    const loginOrRegister = document.querySelector("#loginRegister");

    const currentPage = document.querySelector("#current_page");
    const flavorText = document.querySelector("#button label");
    const inputs = document.querySelectorAll("input");

    const whiteScreen = document.querySelector("#whiteScreen");
    const infoBox = document.querySelector("#infoBox");
    const infoBoxText = document.querySelector("#infoBox > div");
    const infoBoxButton = document.querySelector("#infoBox > button");

    button.addEventListener("click", beginLoginRegister);

    async function beginLoginRegister() {
        if (document.querySelector("#wrapper").classList.contains("darkCoral")) {
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
            infoBoxContent("Contacting server");
            const fetched = await fetch_request(request);
            if (fetched.status === 200) {
                infoBoxContent("New user created!", true);
            } else if (fetched.status === 409) {
                infoBoxContent("Sorry that user is already taken", true);
            } else if (fetched.status === 418) {
                infoBoxContent("The server thinks its a teapot", true);
            }
        } else {
            const request = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username.value}&password=${password.value}`);
            infoBoxContent("Contacting server");
            const fetched = await fetch_request(request);
            if (fetched.status === 200) {
                quiz(username.value);
            } else if (fetched.status === 404) {
                whiteScreen.classList.add("hide");
                flavorText.textContent = "Username or password incorrect";
                flavorText.style.backgroundColor = "red";
            } else if (fetched.status === 418) {
                infoBoxContent("The server thinks its a teapot", true);
            }
        }
    }

    loginOrRegister.addEventListener("click", e => {
        for (const input of inputs) { input.value = ""; }
        document.querySelector("#wrapper").classList.toggle("coral");
        document.querySelector("#wrapper").classList.toggle("darkCoral");

        if (document.querySelector("#wrapper").classList.contains("darkCoral")) {
            currentPage.textContent = "REGISTER";
            flavorText.textContent = "Ready when you are...";
            loginOrRegister.textContent = "Already have an account? Go to login";
            button.textContent = "Register";
        } else {
            currentPage.textContent = "LOGIN";
            flavorText.textContent = "Let the magic start!";
            loginOrRegister.textContent = "New to this? Register for free.";
            button.textContent = "Login";
        }
    })

    infoBoxButton.addEventListener("click", infoBoxRemove);

    function infoBoxContent(content, button) {
        infoBoxText.textContent = content;
        whiteScreen.classList.remove("hide");
        if (button) {
            infoBoxButton.classList.remove("hide");
        }
    }

    function infoBoxRemove() {
        whiteScreen.classList.add("hide");
        infoBoxButton.classList.add("hide");
    }


}