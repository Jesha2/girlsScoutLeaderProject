document.addEventListener('DOMContentLoaded', () => {
    const updateGirlForm = document.getElementById('updateGirlForm');
  
    updateGirlForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const girlId = getGirlIdFromQuery(); // Function to get the girl ID from the query parameter
      const girlData = {
        girl_name: updateGirlForm.elements.girlName.value,
        age: updateGirlForm.elements.age.value,
        guardian_name: updateGirlForm.elements.guardianName.value,
        contact_number: updateGirlForm.elements.contactNumber.value
      };
  
      try {
        const response = await axios.post(`http://localhost:4001/api/updateGirl/${girlId}`, girlData);
        alert('Girl information updated successfully');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard page
      } catch (error) {
        console.error('Error updating girl information:', error);
      }
    });
  
    function getGirlIdFromQuery() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('id');
    }
  });
  