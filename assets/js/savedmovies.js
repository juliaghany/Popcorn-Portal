
var showMovies = document.querySelector("#show-movies");
var clearBtn = document.querySelector("#clear-movies")
var clearOrReturn = document.querySelector("#clear-or-return")

function loadStorage() {
    showMovies.innerHTML = ""
    var savedMovies = JSON.parse(localStorage.getItem("movie"))
    if (!savedMovies || !savedMovies.length) {
        return
    }
    for (let i = 0; i < savedMovies.length; i++) {
        var movie = savedMovies[i]
        var li = document.createElement("li");
        li.textContent = movie
        showMovies.appendChild(li);
    }
}

clearOrReturn.addEventListener("click", function (event) {
    var target = event.target
    if (target.matches(".clear-btn")) {
        localStorage.clear()
        showMovies.innerHTML = ""
    }
}
)

loadStorage();