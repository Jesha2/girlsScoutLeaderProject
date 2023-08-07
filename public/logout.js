//localStorage.removeItem('jwtToken');

let userId = sessionStorage.getItem("userId");
let token = sessionStorage.getItem("token");
function logout() {
    const result = window.confirm('Are you sure you want to log out?');
  if (result) {
    // User clicked "OK", perform the logout  action
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    window.location.href = 'index.html';
  } else {
    // User clicked "Cancel", do nothing 
  }
    

}
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);

