initiateOrderSummary();
let totalShippingFees = 0;
let midleFee = 0;
function initiateOrderSummary() {
  updateOrderSummary(0.00);
  updateShippingFee(0.00);
}

function updateDeliveryDate(input, dateClass) {
  const deliveryDate = input.closest('.delivery-option').querySelector(`.${dateClass}`).innerHTML;
  const newDate = "Delivery date: " + deliveryDate;
  const deliveryDateElement = input.closest('.cart-item-container').querySelector('.js-delivery-date');
  deliveryDateElement.innerHTML = newDate;
}

const deliveryOptionInputs = document.querySelectorAll('.js-second-input');

deliveryOptionInputs.forEach((input) => {
  input.addEventListener('click', () => {
    const productId = input.dataset.productId;
    deliveryOptions[productId].fee = 4.99; // Update the shipping fee for the product
    deliveryOptions[productId].deliveryDate = splitMonthAndDate(middleFastDelivery);

    // Update delivery date and order summary
    updateDeliveryDate(input, 'js-second-date');
    updateOrderSummary(deliveryOptions[productId].fee);

  });
});


const deliveryOptionInputs3 = document.querySelectorAll('.js-third-input');

deliveryOptionInputs3.forEach((input) => {
  input.addEventListener('click', () => {
    const productId = input.dataset.productId;
    deliveryOptions[productId].fee = 9.99; // Update the shipping fee for the product
    deliveryOptions[productId].deliveryDate = splitMonthAndDate(fastDelivery);

    // Update delivery date and order summary
    updateDeliveryDate(input, 'js-third-date');
    updateOrderSummary(deliveryOptions[productId].fee);
  });
});

const deliveryOptionInputs1 = document.querySelectorAll('.js-first-input');

deliveryOptionInputs1.forEach((input) => {
  input.addEventListener('click', () => {
    const productId = input.dataset.productId;
    deliveryOptions[productId].fee = 0.00;
    deliveryOptions[productId].deliveryDate = splitMonthAndDate(freeShiping);
    updateDeliveryDate(input, 'js-first-date');
    initiateOrderSummary();
  });
});

function updateShippingFee(fee) {
  const shippingFee = '$' + fee;
  document.querySelector('.js-shipping').innerHTML = shippingFee;
}

function updateTotalBeforeTax(totalFee) {
  const priceBefore = (itemsPrice + totalFee).toFixed(2);
  const beforeTax = '$' + priceBefore;
  document.querySelector('.js-total-before-tax').innerHTML = beforeTax;
}

function updateEstimatedTax(estimatedTax) {
  const estimated = ((itemsPrice + estimatedTax) * 0.10).toFixed(2);
  const tax = '$' + estimated;
  document.querySelector('.js-estimated-tax').innerHTML = tax;
}

function orderTotal(fee) {
  const totalBeforeTax = itemsPrice + fee;
  const tax = totalBeforeTax * 0.10;
  const totlaOrderPrice = (totalBeforeTax + tax).toFixed(2);
  const totalPrice = '$' + totlaOrderPrice;
  totalOrder = totalPrice;
  document.querySelector('.js-order-total').innerHTML = totalPrice;
  return totalPrice;
}



