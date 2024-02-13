/**
 * @file logout.js
 * Calls fetch on /logout to destroy the session
 * 
 * @see ~/userRoutes.js
 */
async function logout() {
    // Destroy the session 
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  
    // Redirect the user to the homepage 
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('#logout').addEventListener('click', logout);