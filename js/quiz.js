function quiz(username) {
    document.querySelector("#css").setAttribute("href", "css/quiz.css");
    document.querySelector("#wrapper").classList.add("quizColor")
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
            <div id="logout">
                <p>${username}</p>
                <button>logout</button>
            </div>
        </header>
    
        <main>
            <img src="/media/logo.png" id="dogImage">
            <div id="options">
                <button>test</button>
                <button>test</button>
                <button>test</button>
                <button>test</button>
            </div>
        </main>
    
        <footer>
            <p>The Dog Breed Quiz is made possible thanks to the free APi by <a href="">DOG CEO Zine</a></p>
        </footer>
    `;

    document.querySelector("#logout button").addEventListener("click", login_register);
}