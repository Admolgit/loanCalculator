// Declaring Calculator Variables
const loanForm = document.querySelector('#loan-form');


// Calculating Result After Hitting The Submit Button
loanForm.addEventListener('submit', resultCalculated);

function resultCalculated(e) {
  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Show loader
  document.querySelector('#loading').style.display = 'block';

  // Setting Time Out for calculate result
  setTimeout(calculateResults, 2000);

  e.preventDefault()
}

function calculateResults() {
  // Calculate result variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly Payment Calculation
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show Results
  document.querySelector('#results').style.display = 'block';

  // Hide Loading
  document.querySelector('#loading').style.display = 'none';


  } else {
    showErr('Please check your numbers');
  }
}

// Creating show error message
function showErr(error) {

  // hide Results
  document.querySelector('#results').style.display = 'none';

  // Hide Loading
  document.querySelector('#loading').style.display = 'none';

  //Creating a div element 
  const divErr = document.createElement('div');

  // Getting element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Adding class element
  divErr.className = 'alert alert-danger';

  divErr.style.backgroundColor = 'red';

  divErr.style.marginTop = '3em';

  divErr.appendChild(document.createTextNode(error));

  // Inserting error above heading
  card.insertBefore(divErr, heading);

  // Clear errpor after 3 sec
  setTimeout(clearErr, 3000);
}

// clearing the error
function clearErr() {
  document.querySelector('.alert').remove();
}