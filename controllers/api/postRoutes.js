/**
 * @file postRoutes.js
 * Implements the API routes for the `Post` model
 * Supported routes: GET all, GET by id, POST create, PUT update by id, DELETE remove by id
 */

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * @route GET '/api/posts'
 * Finds and returns all post data, including associated User and Comment data 
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
            // Order the data by created_date in descending order 
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
    
        // Validate post data was found in the database
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
 * Find and return the post data by id, including associated User and Comment data
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
            // Get post title and content from the req.body
            title: req.body.title,
            content: req.body.content,
            // Get user_id from req.session and create new Date object for created_date
            created_date: new Date(),
            user_id: req.session.user_id,
        });
        
        res.status(200).json(postData);
    } catch (err) {
        // Post instance failed to be created due to bad request
        res.status(400).json(err);
    }
});

/**
 * @route PUT '/api/posts/:id'
 * Updates a post by id using data from req.body
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
