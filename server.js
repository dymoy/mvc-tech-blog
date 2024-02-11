/* Require necessary npm package dependencies */
const path = require('path');
const sequelize = require('./config/connection');
const express = require('express');
const exphbs = require('express-handlebars');

/* Require local modules */
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

/* Instantiate the express app */
const app = express();
const PORT = process.env.PORT || 3001;

/* Add middleware for body parsing and serving static files in /public */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Add controllers and handlebars for MVC model */
app.use(require('./controllers'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Sync sequelize models to the database, then turn on the server */
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
