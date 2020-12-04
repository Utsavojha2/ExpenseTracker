const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');



const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'));

let transactions = localStorage.getItem('transaction') !== null ? localStorageTransactions : [];
let i = 1;

//Add transaction
function addTransaction(e){
 e.preventDefault();

 if(text.value.trim() === '' || amount.value.trim() === ''){
   alert('Please add a text and amount');
 } else {
    const transaction = {
      id : i++,
      text: text.value,
      amount: parseFloat(amount.value)
    }
    console.log(transaction);
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
    text.focus();
 }

}



// Add transaction to DOM list
function addTransactionDOM(transaction){
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on values
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button>
  `;

  list.appendChild(item);

}

// Update the balance income and expense
function updateValues(){
  const amount = transactions.map(el => el.amount);

  const total = amount.reduce((total,el) => (total += el), 0).toFixed(2);

  const income = amount
    .filter( el => el > 0)
    .reduce((total,el) => total += el, 0)
    .toFixed(2);
  
  const exp = (amount
  .filter( el => el < 0)
  .reduce((total,el) => total += el, 0) * -1).toFixed(2);

if(total < 0){
  let totalX = Math.abs(total);
  balance.innerText = `-$${totalX.toFixed(2)}`;
} else {
  balance.innerText = `$${(total)}`;
}
  
money_plus.innerText = `$${income}`;
money_minus.innerText = `$${exp}`;

}

function updateLocalStorage(){
  localStorage.setItem('transaction', JSON.stringify(transactions));
}

//Remove transaction by id
function removeTransaction(id){
   transactions = transactions.filter(el => el.id !== id); 

   init();

   updateLocalStorage();
}

//Init app
function init(){
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener('submit', addTransaction);