/**
 * @file homeRoutes.js
 * Implements the API routes to return the data to render on the homepage.
 * 
 * @see  ../views/homepage.handlebars
 */

const router = require('express').Router();
const { Post, User, Comment } = require('../models');

/**
 * @route GET '/' 
 * Finds and returns all `Posts` in the database to render in homepage.handlebars
 */
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_date'],
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

        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/:id'
 * Finds and returns the data for Post by id 
 */
router.get('/post/:id', async (req, res) => {
    console.log("homeRoutes GET called...");
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

        // Serialize the data 
        const post = postData.get({ plain: true });

        // Pass data to single-post.handlebars
        res.render(
            'single-post',
            {
                post,
                loggedIn: req.session.loggedIn
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/login'
 * Checks if the user is logged in and renders the login page
 */
router.get('/login', async (req, res) => {
    try {
        // Check if the user is already logged in 
        if (req.session.loggedIn) {
            // Redirect the request to back to Home
            res.redirect('/');
            return;
        }
        // Else, render the code in login.handlebars
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
