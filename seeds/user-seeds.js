/**
 * @file user-seeds.js
 * Calls the bulkCreate function on the `User` model to add data to the database
 */

const { User } = require('../models');

const userData = [
    {
        username: "aloretta",
        email: "aloretta@gmail.com",
        password: "Password1"
    },
    {
        username: "gforest",
        email: "gforest@gmail.com",
        password: "Password2"
    },
    {
        username: "jonclarke",
        email: "jclarke@gmail.com",
        password: "Password3"
    },
    {
        username: "mnaka",
        email: "mnakagawa@gmail.com",
        password: "Password4"
    },
    {
        username: "kentony",
        email: "ktony@gmail.com",
        password: "Password5"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;