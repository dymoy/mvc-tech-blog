/**
 * @function newPostFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is adding a new blog post in add-post.handlebars
 */
async function newPostFormHandler(event) {
	event.preventDefault();
  
    // Get title and content from input fields
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
  
    // Check title and content are not empty 
    if (title && content) {
        // Call the postRoutes.js POST api route to create a new post in the database
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {'Content-Type': 'application/json'}
        });
      
        // Redirect the user back to the dashboard page when the post has been created
        if (response.ok) {
              document.location.replace('/dashboard');
        } else {
              alert(response.statusText);
        }
    } else {
        // reload the page and notify the user title and content fields may not be empty 
        document.location.reload();
        alert('New post title and content cannot be blank.');
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);
