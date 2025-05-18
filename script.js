const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const mainEl = document.getElementById("main-container");

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

  const moviesByIds = await Promise.all(fetchPromises);

  renderHtml(moviesByIds);
});

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
                      <a href="#"><i class="fa-solid fa-circle-plus"></i></i> Watchlist</a>
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
