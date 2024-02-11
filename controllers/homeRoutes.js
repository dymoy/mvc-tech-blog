const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
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

  module.exports = router;
