updateSummaryPrice();

function updateSummaryPrice() {
  const items = 'Items' + ' (' + totalNumberOfItems + ')';
  document.querySelector('.js-number-of-items').innerHTML = items;
  const summaryPrice = '$' + itemsPrice.toFixed(2);
  document.querySelector('.js-payment-summary-money').innerHTML = summaryPrice;
}

