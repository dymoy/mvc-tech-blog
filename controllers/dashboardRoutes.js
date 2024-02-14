/**
 * @file dashboardRoutes.js
 * Implements the dashboard page API routes to render handlebars files
 * 
 * @see  ../views/dashboard.handlebars
 */

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/** 
 * @route GET '/dashboard'
 * Checks the session user, finds the post data for the user, and returns data to render in dashboard.handlebars
 */
router.get('/', withAuth, async (req, res) => {
    try { 
        const postData = await Post.findAll({
            where: {
                // Filter the posts using user_id defined in the session
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_date'
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
            ]
        });

        // Serialize and render the data in .handlebars
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/dashboard/addPost'
 * Checks the session user, finds the post data for the user, and returns data to render in add-post.handlebars
 */
router.get('/addPost', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                // Filter the posts using user_id defined in the session
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_date'
            ],
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

        // Serialize and render the data in add-post.handlebars
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('add-post', {
            posts,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }

})

/**
 * @route GET '/update/:id'
 * Checks the session user, finds the post data by id for the user, and returns data to render in update-post.handlebars
 */
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_date'
            ],
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
        });

        if (!postData) {
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        // Serialize and render the data in update-post.handlebars
        const post = postData.get({ plain: true });
        res.render('update-post', {
            post,
            loggedIn: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
