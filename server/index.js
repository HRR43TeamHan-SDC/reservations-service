require('newrelic');
const app = require('./app');



const port = 4444;

app.listen(process.env.PORT || 4444, () => console.log(`Example app listening on port ${process.env.PORT || 4444}!`));
