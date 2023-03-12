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
var saveBtn = document.querySelector(".save-btn");
var stream = document.querySelector("#streaming");
var logoContainer = document.querySelector("#logo-container");

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
            for (let i = 0; i < 10 && i < data.results.length; i++) {
                const result = data.results[i];
                searchResults += `<button class="search-button" data-id="${result.id}">${result.title}</button>`;
            }
            document.getElementById("search-results").innerHTML = `${searchResults}`;

            var searchButtons = document.querySelectorAll(".search-button");
            for (let i = 0; i < searchButtons.length; i++) {
                searchButtons[i].addEventListener("click", getMovieById);
            }
        })

}

function getMovieById(event) {
    var newRequestUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "?api_key=" + apiKey;
    fetch(newRequestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            poster.setAttribute("src", "https://image.tmdb.org/t/p/w400/" + data.poster_path)
            poster.setAttribute("class", "poster");
            movieTitle.textContent = data.original_title
            movieDescription.textContent = data.overview
            saveBtn.setAttribute("data-title", data.original_title);

        })

    var thirdRequestUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "/credits?api_key=" + apiKey;
    fetch(thirdRequestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            cast.textContent = "Featured Cast: " + data.cast[0].name + ", " + data.cast[1].name + ", " + data.cast[2].name + ", " + data.cast[3].name + ", " + data.cast[4].name
            
            var directorObject = data.crew.find(function(crewMembers) {
                return crewMembers.job === "Director";
            });
            var directorName = directorObject ? directorObject.name : "";
            director.textContent = "Director: " + directorName;

            saveBtn.style.display = "block"
        })


    var streamingRequestUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?rapidapi-key=bbb3c888f8msha5c250ac1598f71p1990c0jsnf2d16e685939&term=" + event.target.textContent;
    fetch(streamingRequestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            logoContainer.innerHTML = "";

            for (var i = 0; i < data.results[0].locations.length; i++) {
                var logo = document.createElement("img");
                var link = document.createElement("a");
                logo.setAttribute("src", data.results[0].locations[i].icon);
                logo.setAttribute("id", "streaming")
                link.setAttribute("href", data.results[0].locations[i].url);
                link.appendChild(logo);
                logoContainer.appendChild(link);
            }
        })

    console.log(event.target)
}

function saveToStorage() {
    var title = saveBtn.getAttribute("data-title")
    var savedMovies = JSON.parse(localStorage.getItem("movie")) || []
    savedMovies.push(title)
    localStorage.setItem("movie", JSON.stringify(savedMovies))
    window.location.href = "savedmovies.html";


    console.log(title);
}

saveBtn.addEventListener("click", saveToStorage);
submitBtn.addEventListener("click", handleFormSubmit);