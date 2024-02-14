/**
 * @function loginFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is logging in with their credentials
 */
async function loginFormHandler(event) {
    event.preventDefault();

    // Collect email and password values from the login form fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
	// Verify that email and password is not empty
    if (email && password) {
      	// Call the userRoute.js POST /login API route to validate credentials and start the session
      	const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
    	});

		// If successful, redirect the browser to the dashboard page
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to login.');
		}
	} else {
		document.location.reload();
		alert("Please enter username and password.");
	}
};
  
/**
 * @function signupFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is signing up to create an account
 */
async function signupFormHandler(event) {
    event.preventDefault();
  
	// Collect username, email, and password from signup form fields
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
	// Verify the values are not empty
    if (username && email && password) {
		// Call the userRoutes.js POST api route to create a user and log them in
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
   		});
  
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to sign up.');
		}
    } else {
		document.location.reload();
		alert("Please enter username, password, and email.");
	}
};
  
/* Add event listeners */
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  