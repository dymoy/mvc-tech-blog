/**
 * @file homeRoutes.js
 * Implements the API routes to return the data to render on the homepage.
 * 
 * @see  ../views/homepage.handlebars
 */

const router = require('express').Router();
const { Post, User } = require('../models');

/**
 * @route GET '/' 
 * Finds and returns all `Posts` in the database to render in homepage.handlebars
 */
router.get('/', async (req, res) => {
    console.log(`Session is logged in for ${req.session.username}`);
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
                    attributes: [
                        'username',
                    ]
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
        res.render('homepage', { posts });
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
