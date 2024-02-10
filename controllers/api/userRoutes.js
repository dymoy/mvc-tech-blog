const router = require('express').Router();
const { User, Post } = require('../../models');

/**
 * @route GET '/api/users'
 * Finds and returns all user data in the database, excluding the password of the users.
 */
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
    
        if(!userData) {
            res.status(404).json({
                message: 'No user data was found in the database.',
            });
            return;
        }
    
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router;
