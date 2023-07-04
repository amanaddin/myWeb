
const tracking = JSON.parse(localStorage.getItem('tracking'));
const dateAndMonth = tracking.arrivingDate;
const splitedDateAndMonth = dateAndMonth.split(" ");
const month = splitedDateAndMonth[1];
const date = parseInt(splitedDateAndMonth[2]); // Convert date to a number
const dateClass = new DateClass();
const day = dateClass.getDay(month, date);

const trackingHtml = `
<div class="order-tracking">
<a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
</a>

<div class="delivery-date">
  Arriving on ${day} , ${tracking.arrivingDate}
</div>

<div class="product-info">
${tracking.name}
</div>

<div class="product-info">
  Quantity: ${tracking.quantity}
</div>

<img class="product-image" src="${tracking.img}">

<div class="progress-labels-container">
  <div class="progress-label">
    Preparing
  </div>
  <div class="progress-label current-status">
    Shipped
  </div>
  <div class="progress-label">
    Delivered
  </div>
</div>

<div class="progress-bar-container">
  <div class="progress-bar"></div>
</div>
</div>
`;

document.querySelector('.js-tracking-main').innerHTML = trackingHtml;
const progressBar = document.querySelector('.progress-bar');
const durationFactor = getShippingDuration(tracking.fee);
const progressPercentage = calculateShippingProgress(date, durationFactor);
progressBar.style.width = progressPercentage + '%';

function calculateShippingProgress(arrivingDate, durationFactor) {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const remainingDays = calculateRemainingDays(currentMonth, currentDate, month, arrivingDate);
  const progress = (100 / durationFactor) * (durationFactor - remainingDays);
  return progress.toFixed(2);
}

function calculateRemainingDays(currentMonth, currentDate, arrivingMonth, arrivingDate) {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let remainingDays = 0;
  remainingDays += daysInMonths[currentMonth - 1] - currentDate;
  remainingDays += arrivingDate;
  for (let monthIndex = currentMonth; monthIndex < arrivingMonth; monthIndex++) {
    remainingDays += daysInMonths[monthIndex - 1];
  }
  return remainingDays;
}

function getShippingDuration(fee) {
  if (fee === 0) {
    return 10;
  } else if (fee === 4.99) {
    return 5;
  } else {
    return 3;
  }
}