/**
 * @function withAuth
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * Checks if there is an active session for the user. 
 * The user is redirected to the login screen if they're not logged in or if the session expired
 */
const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    if (!req.session.loggedIn) {
      	res.redirect('/login');
    } else {
      	next();
    }
  };
  
module.exports = withAuth;
  