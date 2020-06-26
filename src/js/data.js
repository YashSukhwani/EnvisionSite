var heading = "Empty";

/*
Add similar functions for the other buttons.
Style the page properly so that it's mobile view isn't bad.
Display the data correctly in the table according to the specific button clicked.
Add error messages if the button is clicked for an Object ID but no ID is presented. Frontend check.
Add error message if no student with that ID was found. Backend check.
Change API so that student password does not get returned with other details.
Automate the grabbing and using of the auth token from the login screen rather than typing it manually.
Read about whether auth token method of signing in is secure.
*/

const getAll = () => {
  const getConfig = {
    url: '/api/data/',
    headers: {
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU0NDI5ZTZmMTYzZTZkYTY3NTYwYmQiLCJpYXQiOjE1OTMxNTgzMzF9.CzJ_b5momttOBahlV1DrdvCI1OmJeNeghVumXOs_FFU'
    }
  }
  axios(getConfig)
    .then(function(response) {
      // handle success
      console.log(response);
      console.log("Worked");
      return;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      console.log("Not Worked");
      return;
    });
}