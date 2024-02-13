/**
 * @function updatePostFormHandler
 * @param {*} event 
 * 
 * Handles when the update post button in update-post.handlebars is clicked
 */
async function updatePostFormHandler(event) {
	event.preventDefault();
  
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // Retrieve the post ID from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Call the postRoute to update the post by id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {'Content-Type': 'application/json'}
    });
  
    // Redirect the user back to dashboard once the post has been updated
    if (response.ok) {
      	document.location.replace('/dashboard');
    } else {
      	alert(response.statusText);
    }
}
  
document.querySelector('.update-post-form').addEventListener('submit', updatePostFormHandler);