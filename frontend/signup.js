// Function invoked after the form is submittedform
async function signupdata(e) {
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
  // Alternate way
  // const obj = {
  //   name,
  //   email,
  //   password,
  // };

  // Post request to the server to store user details
  try{
    const response =  await axios.post("http://localhost:3000/user/sign-up", obj)
    const newUser = response.data.newUserDetail;
    window.location.href = "./login.html";
  }catch(error){
    console.log(error);
  }
  
}
