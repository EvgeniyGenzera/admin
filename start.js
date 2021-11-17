const mongoose = require('mongoose');

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ",
  );
  process.exit();
}

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

require('./models/User');
require('./models/Callback');
require('./models/About');
require('./models/MainSlider');
require('./models/Sale');
require('./models/Review');
require('./models/Service');
require('./models/Portfolio');
require('./models/Product');
require('./models/ProductCategory');
require('./models/Landing');

const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
