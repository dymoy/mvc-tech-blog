/**
 * @file homeRoutes.js
 * Implements the home page API routes to render handlebars files
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
            ]
        });
    
        if (!postData) {
            res.status(404).json({
                message: 'No post data was found in the database.'
            });
            return;
        }

        // Serialize and render the post data in homepage.handlebars
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
 * Finds and and returns Post data by id to render in single-post.handlebars
 */
router.get('/post/:id', async (req, res) => {
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
            }
        );
        
        if (!postData) {
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        // Serialize and render the post data and render it in single-post.handlebars
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/login'
 * If the user is not logged in, redirect the user to login.handlebars
 */
router.get('/login', async (req, res) => {
    try {
        // Check if the user is already logged in 
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        // If the user is not logged in, render login.handlebars for the user to login or sign up
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
