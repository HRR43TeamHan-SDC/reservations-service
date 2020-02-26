const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './data.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'restaurantId', title: 'restaurantId'},
    {id: 'dateTime', title: 'dateTime'}
  ]
});

generateRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let slowCount = 1;
let fastCount = 1;
generateRestaurantId = () => {
  fastCount++
  if (fastCount === 1000) {
    fastCount = 1;
    slowCount++
  }
  return slowCount;
}
var count1 = 0;
var reservation = [];
generateReservation = () => {
  const dateTime = new Date();
  for (var i = 0; i < 1; i++) {
    for (var k = 0; k < 30; k++) {
      dateTime.setDate(dateTime.getDate() + 1)
      dateTime.setHours(0, 0, 0, 0);
      for (var j = 0; j < 96; j++) {
        dateTime.setMinutes(dateTime.getMinutes() + 15)
        if (Math.random() > 0.5) {
          // reservations.push([null, i, new Date(dateTime)]);
          var time = new Date(dateTime)
          reservation.push(time.toGMTString());
        }
      }
    }
  }
}
generateReservation();


let count = 1;
let seeder = () => {
  let seeds = [];
  while (seeds.length < 1000) {
    seeds.push({
      id: count,
      restaurantId: generateRestaurantId(),
      dateTime: reservation[count1]
    })
    count++
    if (!reservation[count1 + 1]) {
      count1 = 0
    }
    count1++
  }
  return seeds;
}

let batches = 0;
let append = () => {
  if (batches < 10000) {
    batches += 1;
    let data = seeder();
    csvWriter.writeRecords(data).then(() => append());
  } else {
    console.timeEnd('writeCSV');
    console.log('The CSV file was written successfully');
  }
}

console.time('writeCSV');
append();

