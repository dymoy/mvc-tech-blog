const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Call the /login api route to attempt user login
      const response = await fetch('/api/users/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
		// If successful, redirect the browser to the dashboard page
    	if (res.ok) {
        	document.location.replace('/dashboard');
        } else {
			alert('Failed to login.');
		}
      });
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
	// Create a User and add it to the data base
    if (username && email && password) {
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
    }
};
  
document
	.querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  