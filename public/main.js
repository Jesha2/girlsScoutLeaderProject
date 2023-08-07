// script.js
//document.addEventListener('DOMContentLoaded', function() {
  const signupBtn = document.getElementById('signupButton');
  const form = document.getElementById('signupForm');
  const getFormData = (e) => {
      e.preventDefault(); // Prevent form submission
      if (form.checkValidity()) {
        
            // Get form input values
            const leader_name = document.getElementById('leader_name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
        
            // Create a data object to send to Axios
            const leaderData = {
                leader_name: leader_name,
                email: email,
                password: password
            };
        
            // Call the postUserData function
            postUserData(leaderData);
      }else alert("Please fill the fields with the correct values")
        
      // Clear form fields
      document.getElementById('signupForm').reset();
  };
  
  function postUserData(leaderData) {
      // Use Axios to send leaderData to the server
      axios.post('http://localhost:4001/api/signUp', leaderData)
      .then(async (res) => {
              // Handle success
              alert("You have been added successfully. Please login");
              console.log(res.data);
              let token = res.data.token;
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("userId", res.data.leader_id);
              window.location.href = 'dashboard.html';
              
          })
          .catch(error => {
              // Handle error
              if (error.response && error.response.status === 400) {
                  // Display error message from the backend
                  const errorMessage = error.response.data;
                  console.log(errorMessage);
                  document.getElementById('errorMessage').textContent = errorMessage;
              } else {
                  console.error('Error posting user data:', error);
              }
          });
  }
  
  signupBtn.addEventListener('click', getFormData);
  
  // const loginBtn = document.getElementById('loginButton');

  // const getFormDataToLogIn = (e) => {
  //   e.preventDefault();
  
  //   const email = document.getElementById('email').value;
  //   const password = document.getElementById('password').value;
  
  //   const leaderData = {
  //     email: email,
  //     password: password
  //   };
  
  //   postUserDatalogIn(leaderData);
  
  //   document.getElementById('loginForm').reset();
  // };
  
  // function postUserDatalogIn(leaderData) {
  //   axios.post('http://localhost:4001/api/login', leaderData)
  //     .then(response => {
  //       alert("Yaay, You have been successfully logged in");
  //       console.log(response.data);
  //       window.location.href = 'girls.html';
  //     })
  //     .catch(error => {
  //       if (error.response && error.response.status === 400) {
  //         const errorMessage = error.response.data;
  //         console.log(errorMessage);
  //         document.getElementById('errorMessage').textContent = errorMessage;
  //       } else {
  //         console.error('Error posting user data:', error);
  //       }
  //     });
  // }
  
  // loginBtn.addEventListener('click', getFormDataToLogIn);
    
    
  
//});