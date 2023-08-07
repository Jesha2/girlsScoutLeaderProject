// Create and append the Dashboard button
  // Hide the login and sign up buttons
  // this is how the home page should look if user is logged in with sign in / login

if(sessionStorage.getItem("token") != null){
  const loginPgBtn = document.getElementById('loginPgBtn');
  const signupPgBtn = document.getElementById('signupPgBtn');
  
  
//alert("ypu are in dashboard")
loginPgBtn.style.display = 'none';
signupPgBtn.style.display = 'none';
const dashboardBtnContainer = document.getElementById('btnContainer');
const dashboardBtn = document.createElement('button');
dashboardBtn.classList.add('btn');
dashboardBtn.textContent = 'Dashboard';
dashboardBtn.addEventListener('click', navigateToDashboard);
dashboardBtnContainer.appendChild(dashboardBtn);
const logoutBtn = document.createElement('button');
logoutBtn.classList.add('btn');
logoutBtn.textContent = 'Logout';
logoutBtn.addEventListener('click', logout);
dashboardBtnContainer.appendChild(logoutBtn);

  }

  
  function logout() {
      let userId = sessionStorage.getItem("userId");
      let token = sessionStorage.getItem("token");
      if(window.confirm('Are you sure you want to log out?')){
      
        //alert("Are you really sure you want to log out")
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        window.location.href = 'index.html';
      }
  
  }

function navigateToDashboard() {
    // Redirect the user to the dashboard page
    window.location.href = 'dashboard.html';
}
