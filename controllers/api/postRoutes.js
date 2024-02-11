/**
 * @file postRoutes.js
 * Implements the API routes for the `Post` model
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

/**
 * @route GET '/api/posts'
 * Finds and returns all post data in the database
 */
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_date',
            ],
            order: [['created_date', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'created_date'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                }
            ],
        });
    
        if (!postData) {
            res.status(404).json({
                message: 'No post data was found in the database.'
            });
            return;
        }
    
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/api/posts/:id'
 * Find and return the post data by id
 */
router.get('/:id', async (req, res) => {
    try { 
        const postData = await Post.findByPk(
            req.params.id, 
            {
                attributes: ['id', 'title', 'content', 'created_date'],
                include: [
                    { 
                        model: User,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'created_date'],
                        include: {
                            model: User,
                            attributes: ['id', 'username']
                        }
                    }
                ]
            }
        );
        
        if (!postData) {
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/posts/'
 * Creates a post 
 */

module.exports = router;
