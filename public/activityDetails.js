document.addEventListener("DOMContentLoaded", async function() {
    const activityData = sessionStorage.getItem('currentActivity');
    const activity = JSON.parse(activityData);

    if (activity) {
        document.getElementById('activityName').textContent = activity.activity_name;
        document.getElementById('activityDate').textContent = activity.date;
        document.getElementById('activityDescription').textContent = activity.description;
        console.log(activity);
        try {
            // Fetch and display girls who are part of the activity
            const participantsResponse = await axios.get(`http://localhost:4001/api/getGirlsByActivity/${activity.activity_id}`);
            const participantList = document.getElementById('participantList');
            participantsResponse.data.forEach(girl => {
                const li = document.createElement('li');
                li.textContent = girl.girl_name;
                participantList.appendChild(li);
            });

            // Fetch and populate the dropdown with girls not in the activity
            const girlsNotInActivityResponse = await axios.get(`http://localhost:4001/api/getGirlsNotInActivity/${activity.activity_id}`);
            const girlSelect = document.getElementById('girlSelect');
            girlsNotInActivityResponse.data.forEach(girl => {
                const option = document.createElement('option');
                option.value = girl.girl_id;
                option.textContent = girl.girl_name;
                girlSelect.appendChild(option);
            });

            // Add participant when the button is clicked
            const addParticipantBtn = document.getElementById('addParticipantBtn');
            addParticipantBtn.addEventListener('click', async () => {
                const selectedGirl = girlSelect.value;
                //alert("selectedGirl" + selectedGirl)
                if (selectedGirl) {
                    try {
                        // Add logic here to send the selected girl to the server and update the participation table
                        const response = await axios.post('http://localhost:4001/api/addParticipant', {
                            activity_id: activity.activity_id,
                            girl_id: selectedGirl
                        });
                        console.log(response.data);
                            window.location.href = 'activityDetails.html';
                    } catch (error) {
                        console.error('Error adding participant:', error);
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});
