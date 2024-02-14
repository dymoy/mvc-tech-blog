/**
 * @file commentRoutes.js
 * Implements the API routes for the `Comment` model
 * Supported routes: GET read all, POST create, DELETE remove by id
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * @route GET '/api/comments/'
 * Finds and returns all Comment data in the database, including associated User and Post data 
 */
router.get('/', async (req,res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'content', 'created_date'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Post,
                    attributes: [
                        'id', 
                        'title', 
                        'content', 
                        'created_date'
                    ]
                }
            ]
        });
    
        // Verify data was found 
        if (!commentData) {
            res.status(404).json({
                message: 'No comment data was found in the database.'
            });
            return;
        }
    
        // Return data to the client
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/comments/'
 * Creates a Comment using req.body and req.session information
 */
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                // Get comment content and post_id from the req.body
                content: req.body.content,
                post_id: req.body.post_id,
                // Get user_id from req.session and create a new Date object for created_date
                user_id: req.session.user_id,
                created_date: new Date(),
            });

            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * @route DELETE '/api/comments/:id'
 * Deletes a Comment by id 
 */
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Call the .destroy() method to delete the comment from the db by id 
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        // Comment data was not found 
        if (!commentData) {
            res.status(404).json({
                message: 'No comment data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
