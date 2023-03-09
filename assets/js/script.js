var submitBtn = document.querySelector("#submit");
var userInput = document.querySelector(".user-input");
var searchResults = document.querySelector("#search-results");
var apiKey = "7dcb739e08380e5cd93a62e4c16f8444";

var movieTitle = document.querySelector("#movie-title");
var movieDescription = document.querySelector("#movie-description");
var cast = document.querySelector("#featured-actors");
var director = document.querySelector("#director")
var poster = document.querySelector("#poster");
var releaseDate = document.querySelector("#release-date");

function handleFormSubmit(event) {
    event.preventDefault()
    var movie = userInput.value
    if (userInput) {
        getMovieInfo(movie)
    }

}

function getMovieInfo(movie) {
    var queryUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + movie;
    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);


            let searchResults = "";
            for (let i=0; i < 10 && i < data.results.length; i++) {
                const result = data.results[i];
                searchResults += `<button class="search-button" data-id="${result.id}">${result.title}</button>`;
            }
            document.getElementById("search-results").innerHTML = `${searchResults}`;

            var searchButtons = document.querySelectorAll(".search-button");
            for (let i=0; i < searchButtons.length; i++) {
                searchButtons[i].addEventListener("click", getMovieById);
            }
        })

}

function getMovieById(event){
    var newRequestUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "?api_key=" + apiKey;
    fetch(newRequestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
        })

    var thirdRequestUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "/credits?api_key=" + apiKey;
    fetch(thirdRequestUrl)
        .then(function (response) {
        return response.json()
        })
        .then(function (data) {
        console.log(data)
    })
console.log(event.target)
}

submitBtn.addEventListener("click", handleFormSubmit);