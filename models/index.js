/**
 * @file index.js
 * Executes association methods on the Sequelize models to create relationships between them
 */

/* Import the Sequelize models */
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* `User` model hasMany `Posts` and `Comments` */
User.hasMany(Post, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

/* `Post` model belongs to `User` and has many `Comments` */
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// `Comment` model belongs to `Post` and to `User`
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    User,
    Post,
    Comment
};
