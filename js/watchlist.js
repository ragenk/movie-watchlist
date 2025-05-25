const retreiveWatchlist = JSON.parse(localStorage.getItem("moviesWatchlist"));
const mainEl = document.getElementById("main-container");

getHtml(retreiveWatchlist);

function getHtml(arr) {
  if (!retreiveWatchlist || retreiveWatchlist.length == 0) {
    mainEl.innerHTML = `    
        <h2 class="main-title">Your watchlist is looking a little empty...</h2>
        <p class="sub-title"><a href="/index.html"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</a></p>
    `;
    mainEl.style.justifyContent = "center";
  } else {
    let moviesHtml = "";
    mainEl.style.justifyContent = "start";
    for (const movie of arr) {
      moviesHtml += `
          <div class="movie-wrapper">
              <div class="movie__poster">
                  <img src="${movie.Poster}">
              </div>
              <div class="movie">
                  <div class="movie__title">
                      <h3>${movie.Title}</h3>
                      <p><i class="fa-solid fa-star movie__rating"></i> ${movie.imdbRating}</p>
                  </div>
                  <div class="movie__details">
                      <p>${movie.Runtime}</p>
                      <p>${movie.Genre}</p>
                      <button class="add-btn" data-imdbid="${movie.imdbID}"><i class="fa-solid fa-circle-minus" id="add-btn-${movie.imdbID}"></i> Remove</button>
                  </div>
                  <div class="movie__synopsis">
                      <p>${movie.Plot}</p>
                  </div>
              </div>
          </div>
          <div class="separator">
              <hr>
          </div>
          `;
    }
    mainEl.innerHTML = moviesHtml;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.imdbid) {
    removeFromWatchlist(e.target.dataset.imdbid);
    getHtml(retreiveWatchlist);
  }
});

function removeFromWatchlist(id) {
  const movieObj = retreiveWatchlist.filter((movie) => {
    return movie.imdbID === id;
  })[0];

  const index = retreiveWatchlist.indexOf(movieObj);

  if (retreiveWatchlist.includes(movieObj)) {
    retreiveWatchlist.splice(index, 1);
  }

  localStorage.setItem("moviesWatchlist", JSON.stringify(retreiveWatchlist));
}
