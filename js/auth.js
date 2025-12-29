// Function to get all users from LocalStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// SIGNUP LOGIC
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();// dont refersh so we can handlee the data .
        
        const users = getUsers();
        const username = document.getElementById('new-username').value;

        // Check if user already exists
        if (users.find(u => u.username === username)) {
            alert("Username already taken!");
            return;
        }

        const newUser = {
            username: username,
            password: document.getElementById('new-password').value,
            email: document.getElementById('new-email').value,
            phone: document.getElementById('new-phone').value,
            address: document.getElementById('new-address').value,
            totalScore: 0,
            lastLogin: new Date().toLocaleDateString(),
            lastGamePlayed: "None"
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful! Please login.");
        window.location.href = 'login.html';// o back to login page.
    });
}

let attempts = 0; // counter to login attempts

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        if (attempts >= 3) {
            alert("Blocked! Please wait 30 seconds.");
            return;
        }

        const usernameInput = document.getElementById('login-username').value;
        const passwordInput = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            user.lastLogin = new Date().toLocaleDateString();
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            const userIndex = users.findIndex(u => u.username === user.username);
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));

         
            window.location.href = 'index.html';
        } else {
            attempts++;
            alert("Invalid details. Attempt " + attempts + "/3");
            if (attempts === 3) {
                setTimeout(() => { attempts = 0; }, 30000); 
            }
        }
    });
}

// Logout button functionality
function logOut(){
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('currentUser');

      window.location.replace('start.html');
    });
  }
}
