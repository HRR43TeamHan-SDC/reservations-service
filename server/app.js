const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const dotenv = require('dotenv').config();
// const database = require('../database/index.js');
// const client = require('../database/mongoDB/index.js')
const client = require('../database/postgreSQL/index.js');


const app = express();
app.use(express.static('./client/dist'));
app.use(cors());



app.get('/?id=:restaurantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  client.getReservations(
    req.params.restaurantId,
    req.params.dateTime,
    (err, result) => {
      res.send(result);
    }
  )
})
//MySQL
// app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
//   database.getReservations(
//     req.params.restaurantId,
//     req.params.dateTime,
//     (err, result) => {
//       res.json(result);
//     },
//   );
// });

//MongoDB
// app.get('/api/reservations/:restaurantId', (req, res) => {
//   client.db('reservation').collection('reservation').findOne({ restaurantId: 2 })
//   .then(data => {
//     if (data === null) {
//       console.log('error', data);
//       res.sendStatus(400);
//     } else {
//       res.json(data);
//     }
//   })
//   .catch(er => console.log('error at app.get', er))
// })
module.exports = app;
