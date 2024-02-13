/**
 * @function deleteFormHandler
 * @param {*} event 
 * 
 * Handles the event the delete button on update-post.handlebars is clicked 
 */
async function deleteFormHandler(event) {
    event.preventDefault();
    
    // Retrieve the post ID from the window 
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Call the postRoute to delete the post by id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {'Content-Type': 'application/json'}
    });
    
    // Redirect the user back to dashboard once the post has been deleted 
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);