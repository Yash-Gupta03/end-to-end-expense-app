function logindata(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Making values in the form null after submitting the form
  document.getElementById("email").value = null;
  document.getElementById("password").value = null;

  // Creating object of the data
  const obj = {
    email: email,
    password: password,
  };
  // Post request to the server to store user details
  axios
    .post("http://localhost:3000/user/login", obj)
    .then((response) => {
      if (response.status == 200) {
        alert(response.data.message);
        localStorage.setItem("id", response.data.token);
        window.location.href = "./addExpense.html";
      }
    })
    .catch((err) => {
      console.log(err);
      const parentNode = document.getElementById("list");
      const childNode = `<div style="color:red"><h5>${err.message}</h5></div>`;
      parentNode.innerHTML += childNode;
    });
}
