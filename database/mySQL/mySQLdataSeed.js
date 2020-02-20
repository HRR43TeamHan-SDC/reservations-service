// const mysql = require('mysql');
// // const credentials = require('./credentials');
// const Promise = require('bluebird')
// const faker = require('faker')

// const connection = mysql.createConnection({
//   host: process.env.RDS_HOST || 'localhost',
//   user: process.env.RDS_USERNAME || 'root',
//   password: process.env.RDS_PASSWORD || undefined,
//   database: 'reservation'
// });
// connection.connect();

// generateRandomNum = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// let counter = 0;

// const seed = () => {
//   const params = [];

//   params.push(generateRandomNum(1,1000), faker.date.future(2))
// }

// const generateReservation = () => {

//   connection.query('INSERT INTO reservation (restaurantId, dateTime) VALUES (?, ?)', params, (err) => {
//     if (err) {
//       console.log('error at INSERT INTO seeding', err);
//     } else {
//       counter += 1;
//       console.log(counter, 'rows have been inserted');
//       if (counter < 100) {
//         seed()
//       } else {
//         connection.end(() => console.log('db connection has been ended'))
//       }
//     }
//   })

// }
// seed();
// generateReservation();