// signup.js - Updated to work with PHP backend

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-container form');
    const API_URL = 'php/auth_api.php';
    
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
      const usernameOrEmail = signupForm.querySelector('input[placeholder="Username or Email"]').value.trim();
      const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
      const confirmPassword = signupForm.querySelector('input[placeholder="Re-enter Password"]').value.trim();
      
      if (!fullName || !usernameOrEmail || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
      }
      
      if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
      }
      
      const isEmail = usernameOrEmail.includes('@');

      const userData = {
        fullName: fullName,
        password: password
      };
      
      if (isEmail) {
        userData.email = usernameOrEmail;
        userData.username = usernameOrEmail.split('@')[0]; // Simple username from email
      } else {
        userData.username = usernameOrEmail;
        userData.email = usernameOrEmail + '@gmail.com'; // Temporary email, you might want to collect real email
      }
      
      registerUser(userData);
    });
    
    function registerUser(userData) {
      showMessage('Creating your account...', 'info');
      
    
      fetch(`${API_URL}?action=register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          showMessage('Account created successfully! Redirecting to login...', 'success');
          
          setTimeout(() => {
            window.location.href = 'LoginPage.html';
          }, 2000);
        } else {
          showMessage(data.message || 'Registration failed', 'error');
        }
      })
      .catch(error => {
        showMessage('Error connecting to server. Please try again later.', 'error');
        console.error('Registration error:', error);
      });
    }
    
    function showMessage(message, type) {
      let messageDiv = document.querySelector('.message-container');
      if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'message-container';
        signupForm.parentNode.insertBefore(messageDiv, signupForm);
      }
      

      messageDiv.textContent = message;
      messageDiv.className = `message-container ${type}`;
      
    
      if (type === 'success' || type === 'info') {
        setTimeout(() => {
          messageDiv.textContent = '';
          messageDiv.className = 'message-container';
        }, 3000);
      }
    }
  });