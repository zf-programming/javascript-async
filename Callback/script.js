/// Synchronous
// function sync() {
//   console.log('satu');
//   console.log('dua');
//   console.log('tiga');
// }
// sync();

/// Asynchronous
// setTimeout
// function async1() {
//   console.log('satu');
//   setTimeout(() => {
//     console.log('dua'); // dilewati dan akan di print setelah 3000ms
//   }, 3000);
//   console.log('tiga');
// }
// async1();

// setInterval
// function async2() {
//   console.log('satu');
//   setInterval(() => {
//     console.log('dua'); // dilewati dan akan di print setiap 1 detik
//   }, 1000);
//   console.log('tiga');
// }
// async2();

// dengan Button
const button = document.getElementById('test');
button.addEventListener('click', (e) => {
  console.log('Mulai');
  setTimeout(() => console.log('You clicked the button!'), 3000);
  console.log('Selesai');
});
