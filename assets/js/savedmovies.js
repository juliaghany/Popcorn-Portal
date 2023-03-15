//Assign variables
var showMovies = document.querySelector("#show-movies");
var clearBtn = document.querySelector("#clear-movies")
var clearOrReturn = document.querySelector("#clear-or-return")

//Loads movies saved to local storage
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
        var button = document.createElement('button');
        button.setAttribute("class", "btn");
        button.innerHTML = "Remove";
        li.appendChild(button);
        button.dataset.index = i;
        
        }
    }
//Event listener for remove button
showMovies.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        var index = event.target.dataset.index;
        var savedMovies = JSON.parse(localStorage.getItem("movie"));
        savedMovies.splice(index, 1);
        localStorage.setItem("movie", JSON.stringify(savedMovies));
        loadStorage();
    }
});

//Event listener for clear button 
clearOrReturn.addEventListener("click", function (event) {
    var target = event.target
    if (target.matches(".clear-btn")) {
        localStorage.clear()
        showMovies.innerHTML = ""
    }
}
)

loadStorage();

