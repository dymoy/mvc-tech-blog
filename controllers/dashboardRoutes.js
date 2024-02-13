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
 * @route GET '/'
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

// TODO: POST route to create a post 

// TODO: PUT route to update a post 


module.exports = router;
