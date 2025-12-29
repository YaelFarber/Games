(function () {
  // Safely parse JSON, return null on failure
  function safeParse(raw) {
    try { return JSON.parse(raw); } catch { return null; }
  }

  // Check if user is logged in
  function isLoggedIn() {
    const raw = localStorage.getItem('currentUser');
    const user = raw ? safeParse(raw) : null;
    return Boolean(user && user.username);
  }

  // Determine start page path
  function getStartPath() {
    const path = (window.location.pathname || "").toLowerCase();
    return path.includes("/html/") ? "start.html" : "../html/start.html";
  }

  // Redirect to start page if not logged in
  window.requireLogin = function (startPage) {
    const start = startPage || getStartPath();
    if (!isLoggedIn()) {
      window.location.replace(start);
    }
  };

  // Guard logic to enforce login on protected pages
  const page = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const publicPages = new Set(["start.html", "login.html", "signup.html"]);

  // If current page is not public, require login
  if (!publicPages.has(page)) {
    window.requireLogin(getStartPath());
  }
})();
