/**
 * @file postRoutes.js
 * Implements the API routes for the `Post` model
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
                        attributes: ['id', 'content', 'created_date', 'user_id', 'post_id'],
                        include: {
                            model: User,
                            attributes: ['id', 'username']
                        }
                    }
                ]
        });
        
        if (!postData) {
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/posts/'
 * Creates a post and adds it to the database 
 */
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            created_date: new Date(),
            user_id: req.session.user_id,
        });
        
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json({
            message: 'The post failed to be created. Please validate request body or if user is logged in.',
            error: err
        });
    }
});

/**
 * @route PUT '/api/posts/:id'
 * Updates a post by id
 */
router.put('/:id', withAuth, async (req, res)=> {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postData) { 
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route DELETE '/api/posts/:id'
 * Deletes a post by id 
 */
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!postData) { 
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
