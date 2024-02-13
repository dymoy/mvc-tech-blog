/**
 * @file dashboardRoutes.js
 * Implements the API routes to return the data to render on the dashboard page
 * 
 * @see  ../views/dashboard.handlebars
 */

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/** 
 * @route GET '/dashboard'
 * Finds and returns the user's blog posts 
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
 * Renders the add-post.handlebars page for the user to create a new post
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
                'created_date',
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
            ],
        });

        const posts = postData.map(post => post.get({ plain: true }));
        res.render('add-post', {
            posts,
            loggedIn: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }

})

/**
 * @route GET '/update/:id'
 * Renders the update-post.handlebars page for the user to either edit or delete the post 
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
                'created_date',
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
            ],
        });

        if (!postData) {
            res.status(404).json({
                message: 'No post data was found for the requested id.'
            });
            return;
        }

        // Serialize the data 
        const post = postData.get({ plain: true });
        res.render(
            'update-post',
            {
                post,
                loggedIn: true,
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
