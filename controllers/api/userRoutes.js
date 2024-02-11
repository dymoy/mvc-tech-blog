/**
 * @file userRoutes.js
 * Implements the API routes for the `User` model
 */
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

/**
 * @route GET '/api/users/:id'
 * Finds and returns the user data with the requested id, including the associated `Posts` of the user
 */
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(
            req.params.id, 
            {
                attributes: ['id', 'username', 'email'],
                include: [
                    { 
                        model: Post,
                        attributes: ['id', 'title', 'content', 'created_date'],
                    },
                    // TODO: Add associated `Comments` here
                ],
            },
        );

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found with the requested id.'
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/users/'
 * Creates a `User` and adds it to the database 
 */
route.post('/', async (req, res) => {
    try { 
        // Create the user with the req.body information 
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }); 
        
        // Save session data 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/users/login'
 * 
 */
route.post('/login', async (req, res) => {
    try { 
        const userData = await User.findOne({ 
            where: { email: req.body.email } 
        });

        if (!userData) {
            res.status(400).json({ 
                message: 'Incorrect email or password! Please try again.' 
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ 
                message: 'Incorrect email or password! Please try again.' 
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
