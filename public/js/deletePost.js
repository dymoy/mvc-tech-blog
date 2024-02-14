/**
 * @function deletePostFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is deleting a post in update-post.handlebars 
 */
async function deletePostFormHandler(event) {
    event.preventDefault();
    
    // Retrieve id from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Call the postRoute DELETE api route to delete the post by id
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
  
  document.querySelector('.delete-post-btn').addEventListener('click', deletePostFormHandler);
  