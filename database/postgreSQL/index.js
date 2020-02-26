const { Client } = require('pg')
const client = new Client({
  user: "student",
  password: "student",
  host: "localhost",
  port: 5432,
  database: "postgres"
})
client.connect()

const getReservations = async (restaurantId, dateTime, callback) => {
  const dayStart = new Date(dateTime);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dateTime);
  dayEnd.setHours(23, 45, 0, 0);
  const select = `SELECT * FROM reservation WHERE "restaurantId" = ($1) AND "dateTime" BETWEEN ($2)::timestamp and ($3)::timestamp ;`
  client.query(select, [restaurantId, dayStart.toISOString(), dayEnd.toISOString()], (err, results) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log(results)
      callback(null, results.rows.map(record => record.dateTime));
    }
  })
}
const getReservation = (restaurantId, callback) => {
  const queryStr = 'SELECT * FROM reservation WHERE "restaurantId" = ($1)'
  client.query(queryStr, [restaurantId], (err, results) => {
    if (err) {
      throw err;
    }
    callback(err, results)
  })
}
module.exports = {
  getReservation,
  getReservations,
}
module.exports.client = client

