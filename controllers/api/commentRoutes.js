/**
 * @file commentRoutes.js
 * Implements the API routes for the `Comment` model
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

/**
 * @route GET '/api/comments/'
 * Finds and returns all Comment data in the database
 */
router.get('/', async (req,res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: [
                'id',
                'content',
                'created_date'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_date']
                }
            ]
        });
    
        if (!commentData) {
            res.status(404).json({
                message: 'No comment data was found in the database.'
            });
            return;
        }
    
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;