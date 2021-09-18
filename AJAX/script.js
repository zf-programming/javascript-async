// seleksi input dan button
const input = document.querySelector('#search-movie');
const button = document.querySelector('#search');

// event button
button.addEventListener('click', (e) => {
  // panggil getMovies
  getMovies();

  // Clicked the button
  console.log('Okay');

  // clear input
  clearInput();
});

// getMovies dengan AJAX
function getMovies() {
  // cari movies berdasarkan keyword
  const url = getMoviesURL(input.value);

  // AJAX
  const ajax = new XMLHttpRequest(); // membuat ajax
  ajax.open('GET', url); // set request ke url
  ajax.send(); // kirimkan request
  // AJAX Callback (akan di eksekusi setelah proses ajax selesai)
  ajax.onload = () => {
    const response = JSON.parse(ajax.responseText);
    const data = response.Search;
    displayMovieList(data);
  };

  // tidak bisa dilakukan dengan synchronous
  // const response = JSON.parse(ajax.responseText);
  // console.log(response);
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
