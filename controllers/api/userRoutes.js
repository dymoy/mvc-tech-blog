/**
 * @file userRoutes.js
 * Implements the API routes for the `User` model
 */
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
                    {
                        model: Comment,
                        atrributes: ['id', 'content', 'created_date'],
                        include: {
                            model: Post,
                            attributes: ['id', 'title']
                        }
                    }
                ],
            },
        );

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found for the requested id.'
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
router.post('/', async (req, res) => {
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
 * Sets the sessiom.loggedIn value to true if the email entered exists in the database and the password matches
 */
router.post('/login', async (req, res) => {
    try { 
        const userData = await User.findOne({ 
            where: { email: req.body.email } 
        });

        if (!userData) {
            res.status(400).json({ 
                message: 'The entered email was not found. Please try again.' 
            });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ 
                message: 'Incorrect password! Please try again.' 
            });
            return;
        }

        // Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            
            res.status(200).json({ 
                user: userData, 
                message: 'You are now logged in!' 
            });
        });

    } catch(err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST 'api/users/logout' 
 * Logs the user out by destroying the session 
 */
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

/**
 * @route PUT '/api/users/:id' 
 * Updates the data for the user by `id`
 * TODO: add withAuth
 */
router.put('/:id', async (req, res) => {
    try { 
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        });

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route DELETE '/api/users/:id'
 * Removes the requested user by id
 * TODO: add withAuth
 */
router.delete('/:id', async (req, res) => {
    try { 
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
