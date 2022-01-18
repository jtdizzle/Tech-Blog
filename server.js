const express = require('express');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


const app = express();
const PORT = process.env.PORT || 3001;

const seshon = {
  secret: 'Super secret secret',
  //set to expire in 10min
  resave: false,
  cookie: {expires: 10 * 60 * 1000},
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(seshon));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});