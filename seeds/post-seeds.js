const { Post } = require('../models');

const postData = [{
  title: "Does it work?",
  content: "It works!",
  user_id: 1

},
{
  title: "Practice",
  content: "Does this work now?",
  user_id: 2
},
{
  title: "Keep it up",
  content: "Dont skip school",
  user_id: 3
},
{
  title: "Breaktime",
  content: "Remeber to take breaks",
  user_id: 4
}
];


const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;