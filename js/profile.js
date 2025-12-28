/**
 * Profile Logic Script
 * This script handles the retrieval and display of user data from Local Storage.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve the current session data from Local Storage
    const userData = localStorage.getItem('currentUser');

    // 2. Security Check: If no user is logged in, redirect to the login page [cite: 16, 18]
    if (!userData) {
        alert("Access Denied! Please login to view your profile.");
        window.location.href = 'login.html';
        return;
    }

    // 3. Parse the JSON string back into a JavaScript object [cite: 11]
    const user = JSON.parse(userData);

    // 4. Update the DOM elements with the user's personal information 
    // These IDs must match the span/input IDs in your user_profile.html
    document.getElementById('user-name').textContent = user.username;
    document.getElementById('score').textContent = user.totalScore || 0;
    document.getElementById('last-login').textContent = user.lastLogin || "N/A";
    document.getElementById('last-game-played').textContent = user.lastGamePlayed || "None";
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone-number').textContent = user.phone;
    document.getElementById('address').textContent = user.address;
});

/**
 * Log out function
 * Clears the current session and redirects the user to the home page.
 */
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}