// assign variables

var apiKey = "7dcb739e08380e5cd93a62e4c16f8444";
var submitBtn = document.querySelector("#submit");
var userInput = document.querySelector(".user-input");
var searchResults = document.querySelector("#search-results");
var movieContainer = document.querySelector("#movie-container");
var movieTitle = document.querySelector("#movie-title");
var poster = document.querySelector("#poster");
var saveBtn = document.querySelector(".save-btn");
var movieDescription = document.querySelector("#movie-description");
var cast = document.querySelector("#featured-actors");
var director = document.querySelector("#director");
var watchNow = document.querySelector("#watch-now");
var logoContainer = document.querySelector("#logo-container");
var stream = document.querySelector("#streaming");
var lineBreak = document.querySelector("#break");
var recommendationsHeader = document.querySelector('#recommendations-header');
var recommendations = document.querySelector('#recommendations');


function handleFormSubmit(event) {
    event.preventDefault()
    var movie = userInput.value
    if (userInput) {
        getMovieInfo(movie)
    }
}

// function that fetches movie data by user input from API 

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

// function that fetches data such as movie poster, title, description, movie recommendations, and streaming platforms

function getMovieById(event) {
    var generalInfoUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "?api_key=" + apiKey;
    fetch(generalInfoUrl)
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
    
    

    // third fetch request that grabs data on movie cast and director 

    var castCrewUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "/credits?api_key=" + apiKey;
    fetch(castCrewUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)

            cast.innerHTML = "<strong>Featured Cast: </strong>" + data.cast[0].name + ", " + data.cast[1].name + ", " + data.cast[2].name + ", " + data.cast[3].name + ", " + data.cast[4].name

            var directorObject = data.crew.find(function (crewMembers) {
                return crewMembers.job === "Director";
            });
            var directorName = directorObject ? directorObject.name : "";
            director.innerHTML = "<strong>Director: </strong>" + directorName;

            watchNow.innerHTML = "Watch Now:"

            saveBtn.style.display = "block";
            lineBreak.style.display = "block";


        })

    //  fetch request that grabs data on recommended movies based on user's movie selection

    var recommendationsUrl = "https://api.themoviedb.org/3/movie/" + event.target.dataset.id + "/recommendations?api_key=" + apiKey;
    fetch(recommendationsUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            var recommendationsHtml = '';
            for (var i = 0; i < 5 && i < data.results.length; i++) {
                const result = data.results[i];
                recommendationsHtml += `
                <div class="movie-recommendation" data-id="${result.id}">
                    <img src="https://image.tmdb.org/t/p/w300/${result.poster_path}" alt="${result.title}">
                    <p>${result.title}</p>
                </div>`;
            }
            recommendationsHeader.innerHTML = "<strong>Recommended Movies:</strong>";
            recommendations.innerHTML = recommendationsHtml;

            var recommendationDivs = document.querySelectorAll('.movie-recommendation');
            recommendationDivs.forEach(function (div) {
                div.addEventListener('click', function () {
                    getMovieById({ target: { dataset: { id: div.dataset.id } }, title: div.querySelector('p').textContent });
                    var currentMovieDiv = document.getElementById("current-movie");
                    currentMovieDiv.scrollIntoView();
                });
            });
        })

    // fetch request that grabs streaming availability data

    var searchTerm = event.title || event.target.textContent || data.original_title;
    var streamingRequestUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?rapidapi-key=bbb3c888f8msha5c250ac1598f71p1990c0jsnf2d16e685939&term=" + searchTerm;
    fetch(streamingRequestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)

            logoContainer.innerHTML = "";

            // creates buttons with logo and link for each streaming platform that offers streaming for the movie that the user searched 

            for (var i = 0; i < data.results[0].locations.length; i++) {
                var logo = document.createElement("img");
                var link = document.createElement("a");
                var logoBtn = document.createElement("button");
                logoBtn.setAttribute("class", "btn");
                logo.setAttribute("src", data.results[0].locations[i].icon);
                logo.setAttribute("id", "streaming")
                link.setAttribute("href", data.results[0].locations[i].url);
                link.setAttribute("target", "_blank");
                link.appendChild(logo);
                logoBtn.appendChild(link);
                logoContainer.appendChild(logoBtn);
            }
        })

    // console.log(event.target)
}

// saves list of movies to local storage

function saveToStorage() {
    var title = saveBtn.getAttribute("data-title")
    var savedMovies = JSON.parse(localStorage.getItem("movie")) || []
    savedMovies.push(title)
    localStorage.setItem("movie", JSON.stringify(savedMovies))

    // console.log(title);
}

// clears user input after user searches for a movie

function clearSearch() {
    userInput.value = ""
}

// event listeners for button clicks

submitBtn.addEventListener("click", handleFormSubmit);
saveBtn.addEventListener("click", saveToStorage);
submitBtn.addEventListener("click", clearSearch);