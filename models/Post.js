/**
 * @file Post.js
 * Defines the Sequelize model `Post` with the following attributes: 
 *  - id 
 *  - title
 *  - content
 *  - created_date
 *  - user_id (references `User` model `id`) - the user that created the post
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
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
		}
  	},
  	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'post'
  	}
);

module.exports = Post;
