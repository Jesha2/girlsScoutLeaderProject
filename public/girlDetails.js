

document.addEventListener("DOMContentLoaded", async function() {
    const girlData = sessionStorage.getItem('currentGirl');
    const girl = JSON.parse(girlData);

    if (girl) {
        document.getElementById('girl_name').textContent = girl.girl_name;
        document.getElementById('guardian_name').textContent = girl.guardian_name;
        document.getElementById('contact_number').textContent = girl.contact_number;
        document.getElementById('age').textContent = girl.age;

        console.log(girl);
        
    // create table activities(
    //     activity_id serial primary key,
    //     activity_name varchar not null,
    //     date date not null,
    //     description text null,
    //     leader_id integer references leaders(leader_id)
    //     create table girls(
    //         girl_id serial primary key,
    //         leader_id integer references leaders(leader_id),
    //         girl_name varchar not null,
    //         guardian_name varchar not null,
    //         contact_number varchar not null,
    //         age integer not null
        
    // );
    //);
        try {
            // Fetch and display girls who are part of the girl
            const response = await axios.get(`http://localhost:4001/api/getActivitiesByGirl/${girl.girl_id}`);
            const activityList = document.getElementById('participantList');
            response.data.forEach(activity => {
                const li = document.createElement('li');
                li.textContent = activity.activity_name;
                activityList.appendChild(li);
            });

         
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});
