async function editFormHandler(event) {
   event.preventDefault();

   const titles = document.querySelector('input[name="post-titles"]').value.trim();
   const contents = document.querySelector('textarea[name="contents"]').value.trim();
   console.log(title);
   console.log(content);

   const id = window.location.toString().split('/')[
     window.location.toString().split('/').length - 1
   ];
     
     const responses = await fetch(`/api/posts/${id}`, {
       method: 'PUT',
       body: JSON.stringify({
         post_id: id,
         titles,
         contents
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);