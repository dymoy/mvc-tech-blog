/**
 * @file commentRoutes.js
 * Implements the API routes for the `Comment` model
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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

/**
 * @route GET '/api/comments/:id'
 * Finds and returns Comment data by id 
 */
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(
            req.params.id,
            {
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
            }
        );
    
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

/**
 * @route POST '/api/comments/'
 * Creates a Comment using req.body and req.session information
 */
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
              content: req.body.content,
              created_date: new Date(),
              user_id: req.session.user_id,
              post_id: req.body.post_id,
            });

            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * @route PUT '/api/comments/:id'
 * Updates a Comment by id
 */
router.put('/:id', withAuth, async (req, res) => {
    try { 
        const commentData = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route DELETE '/api/comments/:id'
 * Deletes a Comment by id 
 */
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

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
