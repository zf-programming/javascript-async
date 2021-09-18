// seleksi input dan button
const input = document.querySelector('#search-movie');
const button = document.querySelector('#search');

// event button
button.addEventListener('click', (e) => {
  // panggil getMovies
  const promise = getMovies();
  promise.then((value) => value.Search).then((data) => displayMovieList(data));

  // Clicked the button
  console.log('Okay');

  // clear input
  clearInput();
});

// getMovies dengan AJAX + Promise
function getMovies() {
  // cari movies berdasarkan keyword
  const url = getMoviesURL(input.value);

  // Promise
  const promise = new Promise((resolve, reject) => {
    // AJAX
    const ajax = new XMLHttpRequest(); // membuat ajax
    ajax.open('GET', url); // set request ke url
    ajax.send(); // kirimkan request
    // AJAX Callback (akan di eksekusi setelah proses ajax selesai)
    ajax.onload = () => {
      console.log(ajax.status);
      if (ajax.status == 200) {
        const data = JSON.parse(ajax.responseText);
        resolve(data);
      } else {
        reject(Error('Gagal mengambil data'));
      }
    };
  });

  return promise;
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
  return `http://www.omdbapi.com/?apikey=c8800146&s=${keyword}`;
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
