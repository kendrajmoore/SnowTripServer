require("dotenv").config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');

// HANDLEBARS
const exphbs  = require('express-handlebars');
const moment = require('moment')
const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        formatTime: function (date, format) {
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
mongoose.connect('mongodb://localhost/backSnow', { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(true))

app.use(methodOverride('_method'));


//ROUTES
require('./controller/trips.js')(app);

app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
