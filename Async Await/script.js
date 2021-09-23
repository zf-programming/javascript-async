// seleksi input dan button
const input = document.querySelector('#search-movie');
const button = document.querySelector('#search');

// event button
button.addEventListener('click', async () => {
  // karena async await sifatnya synchronous
  // maka error handler nya bisa menggunakan try-catch-finally
  try {
    // panggil getMovies
    const promise = await getMovies(); // returnnya akan ditunggu dan tidak akan dilewat jika di log
    const videos = promise.Search; // sudah berbentuk promise, tidak lagi dilewat
    displayMovieList(videos);
  } catch (error) {
    alert('Gagal Mengambil data Video');
  } finally {
    console.log('Selesai memproses Async Await');
  }

  // Clicked the button
  console.log('Okay');

  // clear input
  clearInput();
});

// getMovies dengan AJAX + Promise
function getMovies() {
  // cari movies berdasarkan keyword
  const url = getMoviesURL(input.value);

  // Fetch API
  return fetch(url, {
    method: 'GET',
  }).then((promise) => promise.json());
}

// function jika ajax error
function getMoviesError() {
  console.error('Error get Movies');
  alert('Error get Movies');
}

// clear input
function clearInput() {
  input.value = '';
}

// function mencari movies dari url
function getMoviesURL(keyword) {
  return `http://www.omdbapi.com/?apikey=c880046&s=${keyword}`;
}

// function memasukkan list ke ul
function displayMovieList(data) {
  const movieContainer = document.querySelector('.movies');
  const movies = createMovieList(data);
  movieContainer.innerHTML = movies;
}

// function membuat list untuk movie
function createMovieList(movies) {
  let list = '';
  movies.forEach((movie) => {
    list += `<li>${movie.Title}</li>`;
  });
  return list;
}
