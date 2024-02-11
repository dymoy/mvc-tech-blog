const router = require('express').Router();
const { User, Post } = require('../../models');

/**
 * @route GET '/api/posts'
 * Finds and returns all post data in the database
 */
router.get('/', async (req,res) => {
    try {
        const postData = Post.findAll({
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
    
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
