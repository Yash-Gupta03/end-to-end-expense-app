async function expensedata(e) {
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
  try{
  const response = await axios.post("http://localhost:3000/expense/add-expense", obj, {
      headers: { Authorization: token },
    })
      if (response.status == 200) {
        const data = response.data.newExpenseDetail;
        showDataOnScreen(data);
      }

    }catch(err) {
      console.log(err);
      const parentNode = document.getElementById("list");
      const childNode = `<div style="color:red"><h5>${err.message}</h5></div>`;
      parentNode.innerHTML += childNode;
    };
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("id");
  console.log(token);

  const decodedToken = parseJwt(token)
  console.log(decodedToken);
  if(decodedToken.ispremiumuser){
    document.getElementById("rzp-btn").style.visibility = 'hidden';
    document.getElementById("rzp-btn-premium").style.visibility = 'visible';
    document.getElementById("leader-board").style.visibility = 'visible'; 
  }
  try{
  const res = await axios.get("http://localhost:3000/expense/get-expense", {
      headers: { Authorization: token },
    })
      for (let i = 0; i < res.data.allExpenseDetails.length; i++) {
        showDataOnScreen(res.data.allExpenseDetails[i]);
      }
  }catch(err){ console.log(err);}
});

function showDataOnScreen(data) {
  const parentElement = document.getElementById("list");
  console.log("I am being called");
  const childElement = `<li id=${data.id}>${data.price} --- ${data.description} --- ${data.category}
                        <button onclick="deleteExpense(${data.id})">Delete</button></li>`;
  parentElement.innerHTML += childElement;
}

async function deleteExpense(id) {
  try{
  const token = localStorage.getItem("id");
  const res = await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {
      headers: { Authorization: token },
    })
      removeFromScreen(id);
  }
    catch(err){ console.log(err)};
}

function removeFromScreen(id) {
  const parentElement = document.getElementById("list");
  const element = document.getElementById(id);
  parentElement.removeChild(element);
}

document.getElementById("rzp-btn").onclick = async function (e) {
  const token = localStorage.getItem("id");
  const response = await axios.get("http://localhost:3000/purchase/premiummembership",
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
      const res = await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        {
          headers: { Authorization: token },
        }
      );
      document.getElementById("rzp-btn-premium").style.visibility = 'visible';
      document.getElementById("rzp-btn").style.visibility = 'hidden';
      document.getElementById("leader-board").style.visibility = 'visible';

      alert("You are premium user");

      localStorage.setItem("id", res.data.token);
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

document.getElementById('leader-board').onclick = async function(){
  try{
    const res = await axios.get("http://localhost:3000/premium/leaderboard");
    const leaderboardData = res.data.expenseLeaderboard;
    for (let i = 0; i < leaderboardData.length; i++) {
      showLeaderboardOnScreen(leaderboardData[i]);
    }
  }catch(err){
    console.log(err);
  }
}

function showLeaderboardOnScreen(data) {
  const parentElement = document.getElementById("leaderboard-list");
  console.log("I am being called");
  const childElement = `<li id=${data.id}>${data.price} --- ${data.description} --- ${data.category}
                        </li>`;
  parentElement.innerHTML += childElement;
}