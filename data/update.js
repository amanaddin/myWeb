let chekUpdate = false;
document.querySelectorAll('.js-update-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    if (chekUpdate) {
      let selectedElement = document.getElementById(productId);
      selectedVlaue = selectedElement.value;
      document.querySelector('.js-' + productId).innerHTML = Number(selectedVlaue);
      const updatedCartData = cartData.map((item) => {
        if (item.productId === productId) {
          item.quantity = Number(selectedVlaue);
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
      totalNumberOfItems = getTotalQuantity(updatedCartData);
      const items = 'Items' + ' (' + totalNumberOfItems + ')';
      document.querySelector('.js-number-of-items').innerHTML = items;
      getSummaryPrice(updatedCartData);
      updateSummaryPrice();
      chekUpdate = false;
    }
    else {
      makeUpdateOption(productId);
    }
  });
});

function makeUpdateOption(productId) {
  let quantityHtml = ` 
  <div class="product-quantity-container">
  <select id= ${productId}>
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</div>`;
  document.querySelector('.js-' + productId).innerHTML = quantityHtml;
  chekUpdate = true;
}

function getTotalQuantity(cart) {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

function getSummaryPrice(cart) {
  itemsPrice = 0;
  cart.forEach((item) => {
    let productId = item.productId;
    let quantity = item.quantity;
    const product = products.find((item) => item.id === productId);
    const price = Number(product.priceCents) / 100;
    itemsPrice += quantity * price;
  })
}