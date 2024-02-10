const { Post } = require('../models');

const postData = [
    {
        title: "The Tech Blog goes live!",
        content: "Use this website to stay in the loop! The Tech Blog is a tool where developers can publish their blog posts and comment on other developers' posts.",
        created_date: "02/10/2024",
        user_id: 2,
    },
    {
        title: "3 Ways to Upgrade your Workflow Management",
        content: "Feeling stuck? Here are a few ways to increase your productivity, manage your time, and reduce stress. Take advantage of project management software. Set clear and strict expectations for yourself. Work on prioritizing your tasks so you stay organized.",
        created_date: "05/12/2020",
        user_id: 1,
    },
    {
        title: "Have you heard of Sequlize?",
        content: "Sequelize is a Node. js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. Contact me if you're interested and want to learn more!",
        created_date: "11/03/2022",
        user_id: 3,
    },
    {
        title: "Code Quiz app is now available!",
        content: "I just created a code quiz app that is now live! Be on top of your learning by reviewing basic web development principles. You can access it here: https://dymoy.github.io/code-quiz/",
        created_date: "09/30/2023",
        user_id: 4,
    },
    {
        title: "The Utility of ESLint: Why you need this extention!",
        content: "Constantly scanning your code to look for that syntax error? ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.",
        created_date: "01/05/2024",
        user_id: 3,
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;