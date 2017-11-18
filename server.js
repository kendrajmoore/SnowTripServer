require("dotenv").config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// HANDLEBARS
const exphbs  = require('express-handlebars');
const moment = require('moment');
const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        formatTime: function (date, format) {
          console.log(date)
          console.log(format)
            var mmnt = moment(date);
            return mmnt.format(format);
        }
    }
});

app.locals.layout = "main"
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// MONGOOSE
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/backSnow', { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(true))
app.use(cookieParser())
app.use(methodOverride('_method'));

const checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}

app.use(checkAuth)


//ROUTES
require('./controller/trips.js')(app);
require('./controller/users.js')(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
