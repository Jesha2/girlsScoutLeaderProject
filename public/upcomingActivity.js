// to get the the upcoming activity on the landing page
const upcomingActivity = document.getElementById('upcomingActivity');
axios.get(`/api/getUpcomingActivity`)
.then(response => {
      const activityData = response.data;
      console.log(activityData);
      // Clear the existing list
      //upcomingActivity.innerHTML = '';
      //upcomingActivity.innerHTML =`<h2>Activities List</h2> `;
      // Convert the date to the desired format (MM-DD-YYYY)
      const dateParts = activityData[0].date.split('-');
      //OR const formattedDateString = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;this will give month  in numeric eg: like 02, so beloe we use options and set month as long to get the name of the month
      const formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDateString = formattedDate.toLocaleDateString(undefined, options);

      upcomingActivity.innerHTML +=activityData[0].activity_name +" on " +formattedDateString;
    })
.catch(e=>console.error("Error getting latest activity "+e));