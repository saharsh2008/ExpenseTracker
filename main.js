const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransaction = [
//   { id: 1, text: "Flower", amount: -20},
//   { id: 2, text: "Salary", amount: 300},
//   { id: 3, text: "Book", amount: -10},
//   { id: 4, text: "Camera", amount: 150}
// ];

const localStorageTransactions =  JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please add a text and amount");
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";

        console.log(transaction);
    }
}

function generateId() {
    return Math.floor(Math.random() * 1000000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
    updateLocalStorage();
}

init();

function updateValues(acc, item) {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    console.log(amounts);
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

form.addEventListener("submit", addTransaction)

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}