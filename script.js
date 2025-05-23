const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const mainEl = document.getElementById("main-container");
let watchlist = [];
let moviesByIds;

searchBtn.addEventListener("click", async () => {
  mainEl.innerHTML = "";
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=f3f350ca&s=${searchInput.value}`
  );

  const data = await response.json();

  const fetchPromises = data.Search.map(async (id) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=f3f350ca&i=${id.imdbID}`
    );
    const data = await response.json();
    return data;
  });

  moviesByIds = await Promise.all(fetchPromises);
  renderHtml(moviesByIds);
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.imdbid) {
    addToWatchlist(e.target.dataset.imdbid);
    localStorage.setItem("moviesWatchlist", JSON.stringify(watchlist));
  }
});

function addToWatchlist(id) {
  const movieObj = moviesByIds.filter((movie) => {
    return movie.imdbID === id;
  })[0];
  const index = watchlist.indexOf(movieObj);

  if (!watchlist.includes(movieObj)) {
    watchlist.push(movieObj);
    document
      .getElementById(`add-btn-${id}`)
      .classList.replace("fa-circle-plus", "fa-circle-minus");
  } else {
    watchlist.splice(index, 1);
    document
      .getElementById(`add-btn-${id}`)
      .classList.replace("fa-circle-minus", "fa-circle-plus");
  }
}

function renderHtml(arr) {
  for (const movie of arr) {
    let moviesHtml = "";
    moviesHtml = `
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
                      <button class="add-btn" data-imdbid="${movie.imdbID}"><i class="fa-solid fa-circle-plus" id="add-btn-${movie.imdbID}"></i> Watchlist</button>
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
    mainEl.innerHTML += moviesHtml;
  }
}
