const mysql = require('mysql');
const credentials = require('./credentials');
const Promise = require('bluebird')

const connection = mysql.createConnection(credentials);
connection.connect();


// const generateReservations = () => {
  //   const reservations = [];
  //   for (let i = 0; i < 100; i += 1) {
    //     const dateTime = new Date();
//     dateTime.setDate(dateTime.getDate() - 1);
//     for (let j = 0; j < 30; j += 1) {
  //       dateTime.setDate(dateTime.getDate() + 1);
//       dateTime.setHours(0, 0, 0, 0);
//       for (let k = 0; k < 96; k += 1) {
  //         dateTime.setMinutes(dateTime.getMinutes() + 15);
  //         if (Math.random() > 0.5) {
    //           reservations.push([null, i, new Date(dateTime)]);
    //           console.log('adding', reservations.length)
    //         }
    //       }
    //     }
    //   }
    //   return reservations;
    // };
    let count = 1;

    let insert = (params) => {
      connection.query('INSERT INTO reservation (restaurantId, dateTime) VALUES (?, ?)', params, (err, result) => {
        if (err) {
          console.log(`Error inserting`)
        }
        else { console.log('success! Added:', count++)}
      })
}

let insertAsync = Promise.promisify(insert)

// connection.query('DELETE FROM reservation', (deletError) => {
  //   if (deletError) throw deletError;
  //   const query = 'INSERT INTO reservation (id, restaurantId, dateTime) VALUES ?';
  //   const values = generateReservations();
  //   connection.query(query, [values], (insertError) => {
//     if (insertError) throw insertError;
//     connection.end();
//   });
// });

const generateReservations = () => {
  const dateTime = new Date();
  for (var i = 0; i < 1; i++) {
    for (var k = 0; k < 30; k++) {
      dateTime.setDate(dateTime.getDate() + 1)
      dateTime.setHours(0, 0, 0, 0);
      for (var j = 0; j < 96; j++) {
        dateTime.setMinutes(dateTime.getMinutes() + 15)
        if (Math.random() > 0.5) {
          // reservations.push([null, i, new Date(dateTime)]);
          insertAsync([i, new Date(dateTime)]);

        }
      }
    }
  }
  console.timeEnd('duck')
}
// const reservations = [];

console.time('duck')
generateReservations();
connection.end()