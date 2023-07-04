
const ordersData = JSON.parse(localStorage.getItem('orders'));
let ordersHtml = "";
ordersData.forEach((order) => {
  if (order.cart && Array.isArray(order.cart)) {
    let orderId = order.orderNumber;
    let orderPlacedDate = order.orderDate;
    let orderPrice = order.totalPrice;
    ordersHtml += `
    <div class="order-container">
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${orderPlacedDate}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>${orderPrice}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${orderId}</div>
      </div>
    </div>
    `;

    order.cart.forEach((cartItem) => {
      if (cartItem.productId && cartItem.quantity) {
        let productId = cartItem.productId;
        let quantity = cartItem.quantity;
        let deliveryD = "";
        const product = products.find((item) => item.id === productId);
        for (const productId in order.deliveryOption) {
          deliveryD = order.deliveryOption[cartItem.productId].deliveryDate;
        }

        ordersHtml += `
          <div class="order-details-grid">

            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryD}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
                <button class="track-package-button js-track-package-button"
                data-product-id = "${productId}"
                >
                  Track package
                </button>
              </a>
            </div>

          </div>
        `;
      } else {
        console.log("Invalid cart data for order:", order);
      }
    });

    ordersHtml += `
      </div>
    </div>
    `;
  } else {
    console.log("Invalid cart data for order:", order);
  }
});

document.querySelector('.js-order-grid').innerHTML = ordersHtml;

let trackingData = {};
document.querySelectorAll('.js-track-package-button').forEach((button) => {
  let quantity = 0;
  let arrivingDate = "";
  let name = "";
  let img = ``;
  let fee = "";
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const product = products.find((item) => item.id === productId);
    name = product.name;
    img = product.image;
    ordersData.forEach((order) => {
      order.cart.forEach((cartItem) => {
        if (productId == cartItem.productId) {
          quantity = cartItem.quantity;
        }
      });

      if (order.deliveryOption.hasOwnProperty(productId)) {
        arrivingDate = order.deliveryOption[productId].deliveryDate;
        fee = order.deliveryOption[productId].fee;
      }
      trackingData = {
        name: name,
        arrivingDate: arrivingDate,
        img: img,
        quantity: quantity,
        fee: fee
      };

      localStorage.setItem('tracking', JSON.stringify(trackingData));
      location.assign('tracking.html');
      console.log(arrivingDate);
      console.log(fee);
    });

  });

});


