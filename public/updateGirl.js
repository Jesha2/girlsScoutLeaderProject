document.addEventListener('DOMContentLoaded', () => {
  const girlData = sessionStorage.getItem('currentGirl');
  const girl = JSON.parse(girlData);
  const updateGirlForm = document.getElementById('updateGirlForm');
  updateGirlForm.elements.girlName.value = girl.girl_name
  updateGirlForm.elements.guardianName.value = girl.guardian_name
  updateGirlForm.elements.contactNumber.value = girl.contact_number
  updateGirlForm.elements.age.value = girl.age;

   
  updateGirlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const girlData = {
      leader_id :userId,
      girl_id:girl.girl_id,
      girl_name: updateGirlForm.elements.girlName.value,
      age: updateGirlForm.elements.age.value,
      guardian_name: updateGirlForm.elements.guardianName.value,
      contact_number: updateGirlForm.elements.contactNumber.value
    };

    try {
      const response = await axios.put(`http://localhost:4001/api/updateGirlsInfo`, girlData);
      //alert('Girl information updated successfully');
      window.location.href = 'dashboard.html'; // Redirect to the dashboard page
    } catch (error) {
      console.error('Error updating girl information:', error);
    }

  });

  });
  