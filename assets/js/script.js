var submitBtn = document.querySelector("#submit");
var userInput = document.querySelector(".user-input");
var apiKey = "7dcb739e08380e5cd93a62e4c16f8444";

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

            var newRequestUrl = "https://api.themoviedb.org/3/movie/" + data.results[0].id + "?api_key=" + apiKey;
            fetch(newRequestUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                })

            var thirdRequestUrl = "https://api.themoviedb.org/3/movie/" + data.results[0].id + "/credits?api_key=" + apiKey;
            fetch(thirdRequestUrl)
                .then(function (response) {
                return response.json()
                })
                .then(function (data) {
                console.log(data)
            })
            })
}


submitBtn.addEventListener("click", handleFormSubmit);