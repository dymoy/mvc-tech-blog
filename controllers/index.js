const router = require('express').Router();

/* Import the models, home, and dashboard API routes */
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

/* Define the paths used for each route */
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

/* Return a 404 error for any unhandled routes */
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
