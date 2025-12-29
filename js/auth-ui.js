'use strict';

(function () {
  // Function to get current user from localStorage
  function getCurrentUser() {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // Check if user is logged in
  const user = getCurrentUser();
  const isLoggedIn = Boolean(user && user.username);

  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const profileBtn = document.getElementById('profileBtn');
  const logoutBtn = document.getElementById('logoutBtn');


  // Show/hide buttons based on login status
  if (loginBtn)  loginBtn.style.display  = isLoggedIn ? 'none' : 'inline-block';
  if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'inline-block';


  // Show/hide buttons based on login status
  if (profileBtn) profileBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
  if (logoutBtn)  logoutBtn.style.display  = isLoggedIn ? 'inline-block' : 'none';

  // Logout button functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('currentUser');

      window.location.replace('start.html');
    });
  }
})();
