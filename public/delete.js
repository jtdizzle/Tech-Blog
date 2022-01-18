async function deleteFormHandler(event) {
   event.preventDefault();

   const id = window.location.toString().split('/')[
       window.location.toString().split('/').length - 1
     ];
     
     const responses = await fetch(`/api/posts/${id}`, {
       method: 'DELETE',
       body: JSON.stringify({
         post_id: id
       }),
       headers: {
         'Content-Type': 'application/json'
       }
     });
     
     if (responses.ok) {
       document.location.replace('/dashboard/');
     } else {
       alert(responses.statusText);
     }
     
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);