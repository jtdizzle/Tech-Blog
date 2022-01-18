async function newFormHandler(event) {
   event.preventDefault();
 
   
   const titles = document.querySelector('input[name="post-title"]').value;
   const contents = document.querySelector('textarea[name="content"]').value;
 
  
   const response = await fetch(`/api/posts`, {
     method: 'POST',
     body: JSON.stringify({
       titles,
       contents
     }),
     headers: {
       'Content-Type': 'application/json'
     }
   });
 
   //  re-direct user to dashboard
   if (response.ok) {
     document.location.replace('/dashboard');
   } else {
     alert(response.statusText);
   }
 };
 
document.querySelector('#add-post-form').addEventListener('submit', newFormHandler);