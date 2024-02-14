/**
 * @file comment-seeds.js
 * Calls the bulkCreate function on the `Comment` model to add data to the database
 */

const { Comment } = require('../models');

const commentData = [
    {
        user_id: 4,
        post_id: 1,
        content: "That's great news! Looking forward to the growth of the website!",
        created_date: "02/11/2024"
    },
    {
        user_id: 5,
        post_id: 2,
        content: "Really needed this! Thanks.",
        created_date: "05/14/2020"
    },
    {
        user_id: 2,
        post_id: 3,
        content: "Very informational. Can't wait to try it out on future projects.",
        created_date: "11/04/2022"
    },
    {
        user_id: 1,
        post_id: 3,
        content: "Do you have any examples of its usage? I'd like to DM you for more info!",
        created_date: "12/05/2022"
    },
    {
        user_id: 3,
        post_id: 4,
        content: "Love the design and just what I needed! Thanks for sharing.",
        created_date: "10/02/2023"
    },
    {
        user_id: 1,
        post_id: 5,
        content: "This looks really useful! I'll have to try it out.",
        created_date: "01/15/2024"
    },
    {
        user_id: 4,
        post_id: 5,
        content: "Have you heard of the extention called Prettier? I would love to know how well it works together with ESLint.",
        created_date: "02/01/2024"
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
