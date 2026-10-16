document.getElementById('survey-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const company_name = document.getElementById('company_name').value;
  const company_email = document.getElementById('company_email').value;
  const number = document.getElementById('number').value;
  const location = document.getElementById('location').value;
const comment = document.getElementById('comment').value
  // Recommendation (radio buttons)
  const recommendationInputs = document.getElementsByName('choice');
  let recommendation;
  for (const input of recommendationInputs) {
    if (input.checked) {
      recommendation = input.value;
      break;
    }
  }

  // Services (checkboxes)
  const serviceInputs = document.querySelectorAll('.input-checkbox:checked');
  const services = Array.from(serviceInputs).map(input => input.value);
  console.log('Services:', services);  

  handleSubmit(company_name, company_email, number, location, recommendation, services, comment);
  event.target.reset();
});

function handleSubmit(company_name, company_email, number, location, recommendation, services, comment) {
  
  const servicesString = services.join(',');
//connect the frontend to the backend
  fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company_name, company_email, number, location, recommendation, services: servicesString, comment }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then((responseJson) => {
      // Display the response message in the browser console
      console.log(responseJson);
       // Show an alert if the survey was sent successfully
       if (responseJson.message === 'Data saved successfully!') {
        alert("Survey sent successfully");
      }
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}