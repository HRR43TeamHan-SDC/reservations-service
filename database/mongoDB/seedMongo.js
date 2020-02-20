const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'reservation';

const client = new MongoClient(url);

generateRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let seeder = () => {
  let seeds = [];
  while (seeds.length < 10) {
    seeds.push({
      restaurantId: generateRandomNum(1, 1000),
      dateTime: faker.date.future(2)
    })
  }
  return seeds
}

client.connect()
  .then(client => {
    console.log('MongoDB is connected to database');
    const db = client.db('reservation');

    let batch = 0;
    let addRes = () => {
      if (batch <= 100) {
        batch += 1;
        let resDoc = seeder();
        db.collection('reservation').insertMany(resDoc, (err, res) => {
          addRes();
        });
      } else {
        console.timeEnd('mongoDb')
        console.log('mongo documents seeded')
      }
      console.time('mongoDb');
      addRes();
    };
  })
  .catch(err => console.log(`MongoDB: DATABASE ERROR => ${err}`))

