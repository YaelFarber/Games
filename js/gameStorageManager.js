const GameStorageManager = {
  userKey(prefix) {
    try {
      const currentUserRaw = localStorage.getItem('currentUser');
      if (!currentUserRaw) return `${prefix}:guest`;
      const { username } = JSON.parse(currentUserRaw);
      return `${prefix}:${username}`;
    } catch (e) {
      console.error('Failed to get user key:', e);
      return prefix;
    }
  },

  updateCurrentUser(updateFn) {
    try {
      const currentUserRaw = localStorage.getItem('currentUser');
      if (!currentUserRaw) {
        console.warn('No user logged in');
        return null;
      }

      const currentUser = JSON.parse(currentUserRaw);
      updateFn(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const idx = users.findIndex(u => u.username === currentUser.username);
      if (idx !== -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
      } else {
        users.push(currentUser);
      }
      
      localStorage.setItem('users', JSON.stringify(users));
      return currentUser;

    } catch (e) {
      console.error('Failed to update current user:', e);
      return null;
    }
  },

  getStorageValue(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      console.error('Storage read error:', e);
      return fallback;
    }
  },

  setStorageValue(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Storage write error:', e);
      return false;
    }
  }
};