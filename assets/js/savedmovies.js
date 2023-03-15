// assign variables

var showMovies = document.querySelector("#show-movies");
var clearBtn = document.querySelector("#clear-movies");
var clear = document.querySelector("#clear-or-return");

// load movie titles saved to local storage

function loadStorage() {
    showMovies.innerHTML = ""
    var savedMovies = JSON.parse(localStorage.getItem("movie"))

    // for loop creating list items for saved movie titles in saved movies list 

    for (let i = 0; i < savedMovies.length; i++) {
        var movie = savedMovies[i];
        var li = document.createElement("li");
        li.textContent = movie;
        showMovies.appendChild(li);
        var button = document.createElement('button');
        button.setAttribute("class", "btn");
        button.innerHTML = "Remove";
        li.appendChild(button);
        button.dataset.index = i;
    }
};

showMovies.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        var index = event.target.dataset.index;
        var savedMovies = JSON.parse(localStorage.getItem("movie"));
        savedMovies.splice(index, 1);
        localStorage.setItem("movie", JSON.stringify(savedMovies));
        loadStorage();
    }
});


// event listener for clear button 

clear.addEventListener("click", function (event) {
    var target = event.target
    if (target.matches(".clear-btn")) {
        localStorage.clear();
        showMovies.innerHTML = ""
    }
}
);

loadStorage();