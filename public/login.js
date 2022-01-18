const loginFormHandler = async (event) => {
   // Stop the browser from submitting the form so we can do so with JavaScript
   event.preventDefault();
 
   // Gather the data from the form elements on the page
   const emails = document.querySelector('#email-login').value.trim();
   const passwords = document.querySelector('#password-login').value.trim();
   const warnings = document.querySelector('#login_warning');
 
   if (emails && passwords) {
     // Send the e-mail and password to the server
     const response = await fetch('/api/users/login', {
       method: 'POST',
       body: JSON.stringify({ emails, passwords }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       document.location.replace('/');
     } else {
       //show a warning message
       const {messages} = await response.json();
       warnings.textContent = messages;
       warnings.classList.remove("is-hidden");
     }
   } else {
     warnings.textContent = `Type in your emai and password to log in.`;
     warnings.classList.remove("is-hidden");
   }
 };
 
 const signupFormHandler = async (event) => {
   // Stop the browser from submitting the form so we can do so with JavaScript
   event.preventDefault();
 
   // Gather the data from the form elements on the page
   const names = document.querySelector('#name-signup').value.trim();
   const emails = document.querySelector('#email-signup').value.trim();
   const passwords = document.querySelector('#password-signup').value.trim();
   const warnings = document.querySelector('#signup_warning');
 
   
   // Make sure that input is valid
   if (!(names && emails && passwords)) {
     warnings.textContent = `Type in your name, email address, and password to log in.`;
     warnings.classList.remove("is-hidden");
     return;
   }
   if (passwords.length < 8) {
     warnings.textContent = `Password must be at least eight characters.`;
     warnings.classList.remove("is-hidden");
     return;
   }
 
   // Send the name, email, and password to the server
   const response = await fetch('/api/users/signup', {
     method: 'POST',
     body: JSON.stringify({ names, emails, passwords }),
     headers: { 'Content-Type': 'application/json' },
   });
 
   if (response.ok) {
     document.location.replace('/');
   } else {
     //show a warning message
     const {message} = await response.json();
     warnings.textContent = message;
     warnings.classList.remove("is-hidden");
   }
 };
 
 document
   .querySelector('.login-form')
   .addEventListener('submit', loginFormHandler);
 
 document
   .querySelector('.signup-form')
   .addEventListener('submit', signupFormHandler);