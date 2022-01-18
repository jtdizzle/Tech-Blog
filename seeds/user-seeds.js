const { User } = require('../models');

const userData = [{
  username: 'John',
  password: 'tes123'

},
{
  username: 'Luke',
  password: 'test234'
},
{
  username: 'Peter',
  password: 'test345'
},
{
  username: 'Paul',
  password: 'test456'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;