

if(sessionStorage.getItem("token") == null)
  (window.location.href = "/public/index.html") && sessionStorage.clear()
    else{
    //alert("you are in dashboard")
    }

    //let userId = sessionStorage.getItem("userId");
    let id = sessionStorage.getItem("userId");

    const girlsList = document.getElementById('girlsList');
    const activitiesList = document.getElementById('activitiesList');
    //const detailsSection = document.getElementById('detailsSection');
    //const detailsContent = document.getElementById('detailsContent');
    //const logoutBtn = document.getElementById('logoutBtn');


    function deleteGirl(girl_id,girl_name){
      const result = window.confirm(`Are you sure you want to delete ${girl_name}`);
      if (result) {
      
              // Delete girl records
              axios.delete(`/api/deleteGirl/${girl_id}`)
              .then(response =>{
                console.log('girl scout  deleted successfully:')   ;
                 window.location.href = `dashboard.html`;   
              }) .catch (error=> 
                  console.error('Error deleting data:', error)
              )
      }

    }
    function deleteActivity(activity_id,activity_name){
      const result = window.confirm(`Are you sure you want to delete ${activity_name}`);
      if (result) {
              axios.delete(`/api/deleteActivity/${activity_id}`)
              .then(response=> {console.log(`Deletion of ${activity_name} successful`);
                window.location.href = `dashboard.html`;   

            })
            .catch(err => console.error(" Error while deleting activity " +err));

      }
    }

    function populateGirlsList() {
      axios.get(`/api/getGirls/${id}`)
        .then(response => {
          const girlsData = response.data; // Assuming the response contains an array of girls
    
          // Clear the existing list
          //girlsList.innerHTML = '';
          
          girlsList.innerHTML=`<h2>Girls List</h2>`;

          // Create add button button
          const addGirlBtn = document.createElement('button');
          addGirlBtn.textContent = 'Add a Girl Scout';
          addGirlBtn.classList.add('btn');

          addGirlBtn.addEventListener('click', () => {
            window.location.href = 'addGirl.html';
          });
          girlsList.appendChild(addGirlBtn);

          // Loop through the data and create list items
          if(girlsData.length !=0) {
          girlsData.forEach(girl => {
            const listItem = document.createElement('div');
            listItem.classList.add('girl-item');
    
            // Create a link for the girl's name
            const nameLink = document.createElement('a');
            nameLink.textContent = girl.girl_name;
            nameLink.href = `girlDetails.html?id=${girl.girl_id}`; // Link to the girl's detail page
            // Add a click event listener to the anchor tag
            nameLink.addEventListener('click', () => {
              // Store the activity data in sessionStorage
              sessionStorage.setItem('currentGirl', JSON.stringify(girl));
            });
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn');

            deleteButton.addEventListener('click', () => {
              deleteGirl(girl.girl_id,girl.girl_name);
            });
    
            // Create update button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Edit';
            updateButton.classList.add('btn');
            updateButton.addEventListener('click', () => {
                // Store the activity data in sessionStorage
                sessionStorage.setItem('currentGirl', JSON.stringify(girl));
              window.location.href = `updateGirl.html?id=${girl.girl_id}`; // Navigate to update page
            });
    
            // Append elements to the list item
            
            listItem.appendChild(nameLink);
            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);
    
            // Append the list item to the girlsList
            girlsList.appendChild(listItem);
          });
          }else {
            console.log("No girls to dispay. Please add girl scout")
    
          }
        })
        .catch(error => {
          console.error('Error fetching girls data:', error);
        });
      
    }

    /************************Activity            */
   
    

    

    function populateActivitiesList() {
      axios.get(`/api/getActivities`)
        .then(response => {
          const activitiesData = response.data;
          console.log(activitiesData);
           // Assuming the response contains an array of activities
    
          // Clear the existing list
          //activitiesList.innerHTML = '';
          activitiesList.innerHTML =`<h2>Activities List</h2> `;

            const addActivityBtn = document.createElement('button');
            addActivityBtn.textContent = 'Add an Activity';
            addActivityBtn.classList.add('btn');
  
            addActivityBtn.addEventListener('click', () => {
              window.location.href = 'addActivity.html';
            });
            activitiesList.appendChild(addActivityBtn);
          // Loop through the data and create list items
          activitiesData.forEach(activity => {
            const listItem = document.createElement('div');
            listItem.classList.add('activity-item');
    
            // Create a link for the activity's name
            const nameLink = document.createElement('a');
            nameLink.textContent = activity.activity_name;
            nameLink.classList.add("popup-link");
            nameLink.href = `activityDetails.html?id=${activity.activity_id}`; // Link to the activity's detail page
            // Add a click event listener to the anchor tag
            nameLink.addEventListener('click', () => {
              // Store the activity data in sessionStorage
            sessionStorage.setItem('currentActivity', JSON.stringify(activity));
             // activityDetails(activity);
          //    if (typeof activityDetail === 'function') {
          //     activityDetail(activity);
          // }

            });
    
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn');
            deleteButton.addEventListener('click', () => {
            deleteActivity(activity.activity_id,activity.activity_name);
            });
    
            // Create update button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Edit';
            updateButton.classList.add('btn');
            updateButton.addEventListener('click', () => {
              sessionStorage.setItem('currentActivity', JSON.stringify(activity));
              window.location.href = `updateActivity.html?id=${activity.activity_id}`; // Navigate to update page
            });
    
            // Append elements to the list item
            listItem.appendChild(nameLink);
            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);
    
            // Append the list item to the girlsList
            activitiesList.appendChild(listItem);
          });
        })
        .catch(error => {
          console.error('Error fetching activities data:', error);
        });
      }
    
    // Call the function to populate the list
    populateGirlsList();
    populateActivitiesList();

    


    
      