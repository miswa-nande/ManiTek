document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const messageContainer = document.querySelector('.message-container');
  const API_URL = 'php/auth_api.php'; // Update this to match your actual PHP file location
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Basic validation
    if (!username || !password) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    
    // Prepare login data
    const loginData = {
      username: username,
      password: password
    };
    
    // Send login request
    loginUser(loginData);
  });
  
  function loginUser(userData) {
    // Show loading state
    showMessage('Logging in...', 'info');
    
    // Send data to PHP API
    fetch(`${API_URL}?action=login`, {
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
      console.log('Login response:', data); // Add this for debugging
      
      if (data.status === 'success') {
        // Store user information
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('isLoggedIn', 'true');
        
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to home.html after successful login
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1500);
      } else {
        showMessage(data.message || 'Login failed', 'error');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      showMessage('Error connecting to server. Please try again later.', 'error');
    });
  }
  
  function showMessage(message, type) {
    if (messageContainer) {
      messageContainer.textContent = message;
      messageContainer.className = `message-container ${type}`;
      messageContainer.style.display = 'block';
      
      // Auto-clear success and info messages after a delay
      if (type === 'success' || type === 'info') {
        setTimeout(() => {
          messageContainer.textContent = '';
          messageContainer.style.display = 'none';
        }, 3000);
      }
    }
  }
});