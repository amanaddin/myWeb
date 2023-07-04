
let checkOutHtml = "";
let totalOrder = "";
const cartData = JSON.parse(localStorage.getItem('cart'));
let shippingDate = new DateClass();
const freeShiping = shippingDate.getShippingDay(10);
const middleFastDelivery = shippingDate.getShippingDay(-5);
const fastDelivery = shippingDate.getShippingDay(-2);
const initialShippingDay = `${freeShiping}`;
let split = splitMonthAndDate(initialShippingDay);

let totalNumberOfItems = 0;
let itemsPrice = 0;
let isFirstRadioSelected = true;
let deliveryOptions = {};
cartData.forEach((cartItem) => {
  let productId = cartItem.productId;
  let quantity = cartItem.quantity;
  totalNumberOfItems += quantity;
  deliveryOptions[productId] = {
    fee: 0, // Initialize the shipping fee to 0
    deliveryDate: split,
    inputClass: 'js-first-input' // Initial selected delivery option class
  };
  const product = products.find((item) => item.id === productId);
  checkOutHtml += `
  <div class="cart-item-container">
  <div class="delivery-date js-delivery-date">
    Delivery date: ${freeShiping}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${product.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-price">
      ${'$' + (Number(product.priceCents) / 100).toFixed(2)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity js-${productId}">${quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-button"
          data-product-id = "${productId}">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-button"
        data-product-id = "${productId}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input js-first-input"
          name="delivery-option-${productId}"
          data-product-id="${productId}">
        <div>
          <div class="delivery-option-date js-first-date">
           ${freeShiping}
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input js-second-input"
          name="delivery-option-${productId}"
          data-product-id="${productId}">
        <div>
          <div class="delivery-option-date js-second-date">
            ${middleFastDelivery}
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input js-third-input"
          name="delivery-option-${productId}"
          data-product-id="${productId}">
        <div>
          <div class="delivery-option-date js-third-date">
            ${fastDelivery}
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  const price = Number(product.priceCents) / 100;
  itemsPrice += quantity * price;
});

document.querySelector('.js-order-summary').innerHTML = checkOutHtml;


function updateOrderSummary() {
  let totalShippingFees = 0; // Initialize total shipping fees

  for (const productId in deliveryOptions) {
    totalShippingFees += deliveryOptions[productId].fee;
  }
  updateShippingFee(totalShippingFees);
  updateTotalBeforeTax(totalShippingFees);
  updateEstimatedTax(totalShippingFees);
  totalOrder = orderTotal(totalShippingFees);
}

function splitMonthAndDate(dateToSplit) {
  const date = `${dateToSplit}`;
  const splitedDate = date.split(",");
  return splitedDate[1];
}

const uuidClass = new UUID();
const uuid = uuidClass.generateUUID();
shippingDate = new DateClass();
const orderPlacedDate = shippingDate.getMonthAndDate();
document.querySelector('.js-place-order-button').addEventListener('click', () => {
  const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
  const newOrder = {
    cart: cartData,
    orderNumber: uuid,
    orderDate: orderPlacedDate,
    totalPrice: totalOrder,
    deliveryOption: deliveryOptions
  };
  existingOrders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(existingOrders));

  if (cartData.length != 0) {
    localStorage.setItem('cart', JSON.stringify([]));
    location.assign('orders.html');
  }
  else {
    console.log('The cart is empity pleace add items in the cart and try again');
  }
});













