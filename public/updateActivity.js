document.addEventListener('DOMContentLoaded', ()=>{
    const activityData = sessionStorage.getItem('currentActivity');
    const activity = JSON.parse(activityData);
    // get the activity date from the session storage and prefill the values
    const updateActivityForm = document.getElementById("updateActivityForm");
    updateActivityForm.elements.activityName.value = activity.activity_name;
    updateActivityForm.elements.date.value = activity.date;
    updateActivityForm.elements.description.value = activity.description;

    //once updates and updateActivity btn is pressed is pressed
    updateActivityForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const activityData = {
            activity_name: updateActivityForm.elements.activityName.value ,
            description : updateActivityForm.elements.description.value ,
            date: updateActivityForm.elements.date.value ,
            activity_id:activity.activity_id
        }
        axios.put(`/api/updateActivity`,activityData)
        .then(response =>{
            //alert('Girl information updated successfully');
            //console.log(response.data);
            window.location.href = 'dashboard.html'; // Redirect to the dashboard page
        })
        .catch(err=>{
            console.error('Error updating Activity information:', err);
        })

    })












})