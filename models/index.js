/**
 * @file index.js
 * Executes association methods on the Sequelize models to create relationships between them
 */

// Import the Sequelize models
const User = require('./User');
const Post = require('./Post');

// `User` model hasMany `Post`s
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// `Post` model belongs to `User`
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {
    User,
    Post,
};