document.querySelector("#wrapper").classList.add("coral");
document.querySelector("#wrapper").innerHTML = `
    <div id="infoBox">hej</div>

    <header>
        <div class="logo"></div>
        <div>Dog Breed Quiz<div>
    </header>

    <h1 id="current_page">LOGIN</h1>

    <main>
        <div>
            <label for="name">User Name:</label>
            <input name="name" id="name">
        </div>
        <div>
            <label for="pass">Password:</label>
            <input type="password" name="pass" id="pass">
        </div>
    </main>

    <div id="button">
        <label for="login">Let the magic start!</label>
        <button name="login">Login</button>
    </div>

    <p id="loginRegister">New to this? Register for free.</p>

    <footer>
        <p>The Dog Breed Quiz is made possible thanks to the free APi by <a href="">DOG CEO Zine</a></p>
    </footer>
`;

document.querySelector("#button button").addEventListener("click", e => {
    if (document.querySelector("#name").value === "hey") {
        console.log("yay");
    }
})

document.querySelector("#loginRegister").addEventListener("click", e => {
    document.querySelector("#wrapper").classList.toggle("coral");
    document.querySelector("#wrapper").classList.toggle("darkCoral");

    if (document.querySelector("#wrapper").classList.contains("darkCoral")) {
        document.querySelector("#current_page").textContent = "REGISTER";
        document.querySelector("#button label").textContent = "Ready when you are...";
        document.querySelector("#loginRegister").textContent = "Already have an account? Go to login";
        document.querySelector("#button button").textContent = "Register";
    } else {
        document.querySelector("#current_page").textContent = "LOGIN";
        document.querySelector("#button label").textContent = "Let the magic start!";
        document.querySelector("#loginRegister").textContent = "New to this? Register for free.";
        document.querySelector("#button button").textContent = "Login";
    }
})