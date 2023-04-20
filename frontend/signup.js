// Function invoked after the form is submittedform
function signupdata(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Making values in the form null after submitting the form
  document.getElementById("name").value = null;
  document.getElementById("email").value = null;
  document.getElementById("password").value = null;

  // Creating object of the data
  const obj = {
    name: name,
    email: email,
    password: password,
  };
  // Post request to the server to store user details
  axios
    .post("http://localhost:3000/user/sign-up", obj)
    .then((response) => {
      const newItem = response.data.newItemDetail;
    })
    .catch((err) => console.log(err));
}
