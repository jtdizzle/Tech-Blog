const logout = async () => {
   // Make a POST request to destroy the session on the back end
   const responses = await fetch('/api/users/logout', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
   });
 
   if (responses.ok) {
     document.location.replace('/login');
   } else {
     alert(responses.statusText);
   }
 };
 
 document.querySelector('#logout').addEventListener('click', logout);