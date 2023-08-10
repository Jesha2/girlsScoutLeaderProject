let leader_id = sessionStorage.getItem("userId");

function addGirl(e){
  e.preventDefault(); 
   //alert("in girl add")
   const form = document.getElementById('addGirlForm');
    if (form.checkValidity()) {
          const girlName = document.getElementById('girlName').value;
          const guardianName = document.getElementById('guardianName').value;
          const contactNumber = document.getElementById('contactNumber').value;
          const age = document.getElementById('age').value;

          console.log('Girl Name:', girlName);
          console.log('Guardian Name:', guardianName);
          console.log('Contact Number:', contactNumber);
          console.log('Age:', age);
          //alert("in girl add")
          const girlData = {
            leader_id: leader_id,
            girl_name: girlName,
            guardian_name: guardianName,
            contact_number: contactNumber,
            age: age
          };
          console.log(girlData);
          // alert("axios call  ")
          axios.post('http://localhost:4001/api/addGirl', girlData)
            .then(response => {
              // alert("girl added in response")
              // Handle successful response from the server
              console.log('Girl added successfully:', response.data);
              // Optionally, you can reset the form after successful submission
              //document.getElementById('addGirlForm').reset();
            //alert("look at console before leaving page if all good")
              window.location.href = 'dashboard.html';
            })
            .catch(error => {
              // Handle error
              console.error('Error adding girl:', error);
            });
    }else alert("Please fill the fields with the correct values")
  }
  
    
    function addActivity(e){
      e.preventDefault(); 
       //alert("in activity add")
       const form = document.getElementById('addActivityForm');
      if (form.checkValidity()) {
          const activityName = document.getElementById('activityName').value;
          const description = document.getElementById('description').value;
          const date = document.getElementById('date').value;
        
          console.log('activity Name:', activityName);
          console.log('description Name:', description);
          console.log('date :', date); 
          //alert("in activity add")
          const activityData = {
            leader_id: leader_id,
            activity_name: activityName,
            description: description,
            date: date
          };
          console.log(activityData);
          // alert("axios call  ")
          axios.post('http://localhost:4001/api/addActivity', activityData)
            .then(response => {
              // alert("activity added in response")
              // Handle successful response from the server
              console.log('activity added successfully:', response.data);
              // Optionally, you can reset the form after successful submission
              //document.getElementById('addActivityForm').reset();
            //alert("look at console before leaving page if all good")
              window.location.href = 'dashboard.html';
            })
            .catch(error => {
              // Handle error
              console.error('Error adding activity:', error);
            });
        }alert("Please fill the fields with the correct values")

      }