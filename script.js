const userArr = [];

//SIGNUP FUNCTION

// Open modal for List Item 3
document.getElementById("signup").addEventListener("click", function () {
  event.preventDefault();
  document.getElementById("modal").style.display = "block";
});

// Close modal
document.getElementById("remove").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

function signup() {
  //Fetch signup values
  const userName = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const emailId = document.getElementById("signup-email").value;

  //Generate Acoount Number
  function randomNumber() {
    let accountNumber = "";
    for (let i = 0; i < 13; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      accountNumber += randomDigit;
    }
    return accountNumber;
  }
  let GenerateRandom = randomNumber();
  console.log(GenerateRandom);

  //Storing in object
  const users = {
    userName: userName,
    password: password,
    emailId: emailId,
    accountNumber: GenerateRandom,
  };

  //nested transactions
  const transactions = {
    deposit: [],
    withdrawal: [],
    transactionHistory: [],
    timings: [],
  };

  users.transactions = transactions;

  console.log(users);
  userArr.push(users);
  alert("Signup Successfull");

  //Storing in LS
  localStorage.setItem("storingUsers", JSON.stringify(userArr));

  //Clearing the values
  document.getElementById("signup-username").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("signup-email").value = "";

  const userDetails = JSON.parse(localStorage.getItem("storingUsers"));
  console.log(userDetails);
  document.getElementById("modal").style.display = "none";

  //   // display image
  //   const imageInput = document.getElementById("photo");
  //   const image = document.getElementById("img");
  //   const selectedFile = imageInput.files[0];

  //   if (selectedFile) {
  //     const imageElement = document.createElement("imag");
  //     imageElement.src = URL.createObjectURL(file);
  //     imageElement.alt = "Uploaded Image";

  //     image.innerHTML = ""; // Clear previous image
  //     image.appendChild(imageElement);
  //   }
}

//LOGIN FUNCTION

function login() {
  const userName = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  //Get values from LS
  const userDetails = JSON.parse(localStorage.getItem("storingUsers"));
  console.log(userDetails);
  flag = false;

  // User Validation

  let login = "";
  let accountNumber1 = "";

  userDetails.forEach((item) => {
    if (item.userName === userName && item.password === password) {
      flag = true;
      login = item.userName;
      accountNumber1 = item.accountNumber;
    }
  });

  if (flag === true) {
    alert("Login Successful");
    window.location.href = "dashboard.html";
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
  } else {
    alert("Invalid Login");
  }

  localStorage.setItem("loginUserName", login);
  localStorage.setItem("accountNumber1", accountNumber1);
}
