const loginBtn = document.getElementById('loginButton');

//signUpBtn.style.display = 'none';
const getFormDataToLogIn = (e) => {
  e.preventDefault();
  //loginBtn.style.display = 'none';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const leaderData = {
    email: email,
    password: password
  };

  postUserDatalogIn(leaderData);

  document.getElementById('loginForm').reset();
};

function postUserDatalogIn(leaderData) {
  axios.post('http://localhost:4001/api/login', leaderData)
  .then(async (response) => {
      alert("Yaay, You have been successfully logged in");
      console.log(response.data);
      let token = await response.data.token;//we will wait till token is created
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", response.data.leader_id);
      //window.location.href = `/`;
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        console.log(errorMessage);
        document.getElementById('errorMessage').textContent = errorMessage;
      } else {
        console.error('Error posting user data:', error);
      }
    });
}

loginBtn.addEventListener('click', getFormDataToLogIn);
  
  