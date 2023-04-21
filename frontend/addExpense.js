function expensedata(e) {
  e.preventDefault();
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  // Making values in the form null after submitting the form
  document.getElementById("price").value = null;
  document.getElementById("description").value = null;
  document.getElementById("category").value = null;

  // Creating object of the data
  const obj = {
    price: price,
    description: description,
    category: category,
  };
  // Post request to the server to store user details
  const token = localStorage.getItem("id");
  axios
    .post("http://localhost:3000/expense/add-expense", obj, {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.status == 200) {
        const data = response.data.newExpenseDetail;
        showDataOnScreen(data);
      }
    })
    .catch((err) => {
      console.log(err);
      const parentNode = document.getElementById("list");
      const childNode = `<div style="color:red"><h5>${err.message}</h5></div>`;
      parentNode.innerHTML += childNode;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("id");
  console.log(token);
  axios
    .get("http://localhost:3000/expense/get-expense", {
      headers: { Authorization: token },
    })
    .then((res) => {
      for (let i = 0; i < res.data.allExpenseDetails.length; i++) {
        showDataOnScreen(res.data.allExpenseDetails[i]);
      }
    })
    .catch((err) => console.log(err));
});

function showDataOnScreen(data) {
  const parentElement = document.getElementById("list");
  const childElement = `<li id=${data.id}>${data.price} --- ${data.description} --- ${data.category}
                        <button onclick="deleteExpense(${data.id})">Delete</button></li>`;
  parentElement.innerHTML += childElement;
}

function deleteExpense(id) {
  const token = localStorage.getItem("id");
  axios
    .delete(`http://localhost:3000/expense/delete-expense/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      removeFromScreen(id);
    })
    .catch((err) => console.log(err));
}

function removeFromScreen(id) {
  const parentElement = document.getElementById("list");
  const element = document.getElementById(id);
  parentElement.removeChild(element);
}

document.getElementById("rzp-btn").onclick = async function (e) {
  const token = localStorage.getItem("id");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(`this is the ${response}`);
  let options = {
    'key': response.data.key_id,
    'order_id': response.data.order.id,
    'handler': async function x(response) {
      console.log("Checking!!! is it working");
      await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        {
          headers: { Authorization: token },
        }
      );
      alert("You are premium user");
      document.getElementById("rzp-btn").innerHTML = "You are a premium user";
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment failed", function (response) {
    console.log(response);
    alert("something went wrong");
  });
};
