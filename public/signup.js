async function signupFormHandler(event) {
   event.preventDefault();


   const usernames = document.querySelector('#username-signup').value.trim();
   const passwords = document.querySelector('#password-signup').value.trim();

   if (usernames && passwords) {
       const response = await fetch('/api/users', {
           method: 'POST',
           body: JSON.stringify({
               usernames,
               passwords
           }),
           headers: { 'Content-Type': 'application/json' }
       });
       if (response.ok) {
           console.log('success');
           document.location.replace('/dashboard');
       } else {
           alert(response.statusText);
       }
   }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);