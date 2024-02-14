/**
 * @file Comment.js
 * Defines the Sequelize model `Comment` with the following attributes: 
 *  - id 
 *  - content
 *  - user_id (references `User` model `id`) - the user that created the comment
 *  - post_id (references `Post` model `id`) - the post of which the comment is replied to
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataTypes.TEXT('long'),
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'post',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment'
	}
);

module.exports = Comment;
