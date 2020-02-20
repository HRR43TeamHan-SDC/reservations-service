const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './mongo.csv',
  header: [
    {id: 'restaurantId', title: 'restaurantId'},
    {id: 'dateTime', title: 'dateTime'}
  ]
});

generateRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let count = 1;
let seeder = () => {
  let seeds = [];
  while (seeds.length < 1000) {
    seeds.push({
      id: count,
      restaurantId: generateRandomNum(1, 1000),
      dateTime: faker.date.future(2)
    })
    count++
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