// Seleksi Search
const search = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

// Search Button Event
searchBtn.addEventListener('click', async () => {
  if (search.value !== '') {
    try {
      const data = await getMovies(search.value);
      const movies = data.Search;
      showMovies(movies);
    } catch (error) {
      alert('Gagal Mengambil Data Film');
    }

    clear();
  } else alert('Masukkan Judul Film!');
});

// Details Button Event
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('details-btn')) {
    try {
      const imdbID = e.target.dataset.imdbid;
      const movie = await getMovieDetails(imdbID);
      showDetails(movie);
    } catch (error) {
      alert('Gagal Mengambil Data Film');
    }
  }
});

// clear search
function clear() {
  search.value = '';
}

// get Movies JSON
async function getMovies(keyword) {
  const url = moviesURL('s', keyword);

  const promise = await fetch(url, {
    method: 'GET',
  });
  return await promise.json();
}

// get content from url
function moviesURL(key, keyword) {
  return `http://www.omdbapi.com/?apikey=c8800146&${key}=${keyword}`;
}

// show movies to Container
function showMovies(movies = []) {
  const moviesContainer = document.querySelector('.movies-container');
  if (movies.length == 0) alert('Gagal Mengambil Data Film');
  else moviesContainer.innerHTML = createCards(movies);
}

// create Cards
function createCards(movies) {
  let cards = '';

  movies.forEach((movie) => {
    cards += `<div class="col-sm-6 col-md-4 col-lg-3 mb-5">
    <div class="card">
      <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" />
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
        <a
          href="#"
          class="btn btn-primary details-btn"
          data-imdbID="${movie.imdbID}"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          >Details</a>
      </div>
    </div>
  </div>`;
  });

  return cards;
}

// Get Movie Details
async function getMovieDetails(keyword) {
  const url = moviesURL('i', keyword);

  const promise = await fetch(url, {
    method: 'GET',
  });

  return await promise.json();
}

// show Details to modal
function showDetails(movie) {
  const modalContainer = document.querySelector('.modal-content');
  modalContainer.innerHTML = createDetailsContent(movie);
}

// create Content for Details
function createDetailsContent(movie) {
  return `<div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">
    ${movie.Title} (${movie.Year})</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <div class="row">
      <div class="col-5">
        <img src="${movie.Poster}" class="card-img-top" alt=""/>
      </div>
      <div class="col">${detailList(movie)}</div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
  </div>`;
}

// Create list for details
function detailList(movie) {
  return `<ul class="list-group">
    <li class="list-group-item"><span class="fw-bold">Released</span> : ${movie.Released}</li>
    <li class="list-group-item"><span class="fw-bold">Runtime</span> : ${movie.Runtime}</li>
    <li class="list-group-item"><span class="fw-bold">Genre</span> : ${movie.Genre}</li>
    <li class="list-group-item"><span class="fw-bold">Director</span> : ${movie.Director}</li>
    <li class="list-group-item"><span class="fw-bold">Writer</span> : ${movie.Writer}</li>
    <li class="list-group-item"><span class="fw-bold">Actors</span> : ${movie.Actors}</li>
    <li class="list-group-item"><span class="fw-bold">imdbRating</span> : ${movie.imdbRating}</li>
    <li class="list-group-item"><span class="fw-bold">Plot</span> : <br />${movie.Plot}</li>
  </ul>
  `;
}
