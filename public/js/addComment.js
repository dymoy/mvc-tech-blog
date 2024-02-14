async function newCommentFormHandler(event) {
    event.preventDefault();
  
    // Instantiate `content` to the value of #comment-content tag
    const content = document.getElementById('comment-content').value;

    // Retrieve post_id from window 
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // Validate that inputted comment is not empty 
    if (content) {
        console.log("Calling POST api route...");
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                content,
                post_id
            }),
            headers: {'Content-Type': 'application/json'}
        });
      
        if (response.ok) {
            // If the POST request was successful, reload the page to render the new added comment
            document.location.reload();
        } else {
            alert(response.statusText);
        }
      }
  }
  
document.querySelector('.new-comment-form').addEventListener('submit', newCommentFormHandler);