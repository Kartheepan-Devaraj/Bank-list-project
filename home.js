//Get values from LS
const userDetails = JSON.parse(localStorage.getItem("storingUsers"));
console.log(userDetails);

//store values
const login1 = localStorage.getItem("loginUserName");
const account = localStorage.getItem("accountNumber1");
const msg = document.getElementById("welcome-msg");
const bal = document.getElementById("newMsg");
const summary = document.getElementById("summary");
const newDeposit = document.getElementById("new-deposit");
const credited = document.getElementById("new-deposit");
const debited = document.getElementById("new-withdrawal");

//getdateandtime

const currentDate = new Date();
const currentDateTime = currentDate.toLocaleString();

//display username
const html = `<b><p>${login1}</p></b>
            <b><p>${account}</p></b>`;
msg.innerHTML = html;

console.log(login1, account);

//amount transaction
const arrTransaction = [];
const dateAndTime = [];

let sum = 0;
function deposit() {
  const deposit = document.getElementById("deposit-amount").value;
  if (deposit == "") {
    alert("Enter Deposit Amount");
    return;
  }
  flag = false;
  userDetails.forEach((num) => {
    if (num.accountNumber === account) {
      num.transactions.deposit.push(deposit);
      num.transactions.transactionHistory.push(deposit);
      arrTransaction.push(deposit);
      num.transactions.timings.push(currentDateTime);
    }
    console.log(num.accountNumber, num.transactions.transactionHistory);
  });

  document.getElementById("deposit-amount").value = "";
  const updateData = JSON.stringify(userDetails);
  localStorage.setItem("storingUsers", updateData);

  // console.log(deposit);
  // console.log(account);
  console.log(userDetails);
  location.reload();
}

function transfer() {
  const withdraw = document.getElementById("transfer-amount").value;
  const transfer = document.getElementById("transfer-id").value;
  if (transfer == "" && withdraw == "") {
    alert("Enter Account Number and withdraw Amount");
    return;
  } else if (withdraw == "") {
    alert("Enter Withdraw Amount");
    return;
  } else if (transfer == "") {
    alert("Enter Account Number");
    return;
  }
  console.log(transfer);

  flag = false;

  //for receiver transaction history
  userDetails.forEach((num) => {
    if (num.accountNumber === transfer) {
      num.transactions.deposit.push(withdraw);
      num.transactions.transactionHistory.push(withdraw);
      num.transactions.timings.push(currentDateTime);
    }
    console.log(num.accountNumber);
  });

  //for sender transaction history
  userDetails.forEach((num) => {
    if (num.accountNumber === account) {
      num.transactions.withdrawal.push(-withdraw);
      num.transactions.transactionHistory.push(-withdraw);
      num.transactions.timings.push(currentDateTime);
    }
    console.log(num.accountNumber);
  });

  document.getElementById("transfer-amount").value = "";
  document.getElementById("deposit-amount").value = "";
  const updateData = JSON.stringify(userDetails);
  localStorage.setItem("storingUsers", updateData);

  // console.log(deposit);
  // console.log(account);
  console.log(userDetails);
  location.reload();
}

const retrivedArr = JSON.parse(localStorage.getItem("storingUsers"));

transArr = [];
dateArr = [];
depArr = [];
debitArr = [];

retrivedArr.forEach((array) => {
  console.log(array);
  if (array.accountNumber === account) {
    transArr = array.transactions.transactionHistory;
    dateArr = array.transactions.timings;
    depArr = array.transactions.deposit;
    debitArr = array.transactions.withdrawal;
    console.log(array.transactions.transactionHistory);
    console.log(transArr);
    console.log(debitArr);
  }
});

let displayValues = "";
let balance = 0;
let displayBalance = "";
let credit = 0;
let debit = 0;
let history = document.getElementById("table");
transArr.forEach((item, i) => {
  console.log(item);
  type = transArr[i] > 0 ? "Credited" : "Debited";

  // if (transArr[i] > 0) {
  //   history.style.color = "green";
  // }

  displayValues += `<div id="history">
  <table >
    <tr>
      <td> <img src="C:\Users\D.KARTHEEPAN\Downloads\BankList\images\transaction (1).png" alt="Image" height="40px" width="35px" /></td>
      <td><h2>&nbsp; ${type}&nbsp; &nbsp;&nbsp;</h2></td>
      <td><h3>${dateArr[i]}</h3></td>
      <td><h2>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;${Math.abs(
        transArr[i]
      )}$</h2></td>
    </tr>
  </table>
  </div>`;
  credit = depArr[i] > 0 ? credit + parseInt(depArr[i]) : credit;
  debit = debitArr[i] < 0 ? debit + parseInt(debitArr[i]) : debit;
  balance = transArr[i] > 0 ? balance + parseInt(transArr[i]) : balance;
  console.log(balance);

  displayBalance = `<h2>${"$"}${balance}</h2>`;
});
summary.innerHTML = displayValues;
bal.innerHTML = displayBalance;
credited.innerHTML = "$" + credit;
debited.innerHTML = "$" + Math.abs(debit);

// `<b><p>${i + 1}${"-" + type + "-" + " "}${
//   " " + ""
// } ${Math.abs(transArr[i])}</p></b>`;

// sum += deposit;
// localStorage.setItem("storedSum", sum);
// const store = localStorage.getItem("storedSum");
// newDeposit.innerHTML = "$" + store;
// console.log(store);
