const { Comment } = require('../models');

const commentData = [{
    comment_text: "Test. Keep coding",
    user_id: 1,
    post_id: 1
},
{
    comment_text: "Test. keep on Coding",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "This will get easier",
    user_id: 3,
    post_id: 3
},
{
    comment_text: "Last test. Almost done",
    user_id: 4,
    post_id: 4
}
];
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;