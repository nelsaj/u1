if (localStorage.getItem("status")) {
    quiz(localStorage.getItem("username"));
} else {
    login_register();
};