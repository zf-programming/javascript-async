// seleksi input dan button
const input = document.querySelector('#search-movie');
const input2 = document.querySelector('#search-movie2');
const input3 = document.querySelector('#search-movie3');
const button = document.querySelector('#search');

// event button
button.addEventListener('click', (e) => {
  // panggil getMovies
  // const promise = getMovies(input.value);
  // promise
  //   .then((value) => value.Search) // method jika promise resolved/fullfiled
  //   .then((data) => displayMovieList(data))
  //   .catch((error) => alert(error)) // method jika promise rejected
  //   .finally(() => console.log('Promise Selesai')); // method yang akan di eksekusi di akhir promise
  // // Clicked the button
  // console.log('Okay');

  // Promise All
  const promise = getMovies(input.value);
  const promise2 = getMovies(input2.value);
  const promise3 = getMovies(input3.value);

  Promise.all([promise, promise2, promise3])
    .then((values) => values.map((value) => value.Search))
    .then((data) =>
      data.forEach((videos) => {
        displayMovieList(videos);
      })
    );
  // clear ul
  clearMovieList();
  // clear input
  clearInput();
});

// getMovies dengan AJAX + Promise
function getMovies(keyword) {
  // Promise
  const promise = new Promise((resolve, reject) => {
    // AJAX
    const ajax = new XMLHttpRequest(); // membuat ajax
    ajax.open('GET', getMoviesURL(keyword)); // set request ke url
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
  input2.value = '';
  input3.value = '';
}

// function mencari movies dari url
function getMoviesURL(keyword) {
  return `http://www.omdbapi.com/?apikey=c8800146&s=${keyword}`;
}

// function memasukkan list ke ul
function displayMovieList(data) {
  const movieContainer = document.querySelector('.movies');
  const movies = createMovieList(data);
  movieContainer.innerHTML += movies;
}

// function membuat list untuk movie
function createMovieList(movies) {
  let list = '';
  movies.forEach((movie) => {
    list += `<li>${movie.Title}</li>`;
  });
  return list;
}

// function clear Movie List (ul)
function clearMovieList() {
  document.querySelector('.movies').innerHTML = '';
}
