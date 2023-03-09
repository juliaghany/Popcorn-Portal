var submitBtn = document.querySelector("#submit");
var userInput = document.querySelector(".user-input");
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

            poster.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + data.results[1].poster_path)
            movieTitle.textContent = data.results[1].original_title
            movieDescription.textContent = data.results[1].overview

            var newRequestUrl = "https://api.themoviedb.org/3/movie/" + data.results[1].id + "?api_key=" + apiKey;

            fetch(newRequestUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                    
                    releaseDate.textContent = data.release_date

                })

            var thirdRequestUrl = "https://api.themoviedb.org/3/movie/" + data.results[1].id + "/credits?api_key=" + apiKey;
            fetch(thirdRequestUrl)
                .then(function (response) {
                return response.json()
                })
                .then(function (data) {
                    console.log(data)
                
                    cast.textContent = "Featured Cast: " + data.cast[0].name + ", " + data.cast[1].name + ", " + data.cast[2].name + ", " + data.cast[3].name + ", " + data.cast[4].name 
                    director.textContent = "Director: " + data.crew[2].name 

            })
        })
    
         
}


submitBtn.addEventListener("click", handleFormSubmit);