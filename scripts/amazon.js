
cartQuantityLocalStorage = JSON.parse(localStorage.getItem('cart'));
if (cartQuantityLocalStorage) {
  let c = 0;
  cartQuantityLocalStorage.forEach((item) => {
    c += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = c;
}
let productHtml = '';

products.forEach((product) => {
  productHtml += `
  <div class="product-container">
  <div class="product-image-container">
    <img class="product-image" src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    ${(product.priceCents / 100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select id="${product.id}">
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
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart"
  data-product-id = "${product.id}">
    Add to Cart
  </button>
</div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productHtml;
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener(('click'), () => {
      const productId = button.dataset.productId;
      cartQuantityLocalStorage = JSON.parse(localStorage.getItem('cart'));
      if (cartQuantityLocalStorage) {
        cart = cartQuantityLocalStorage;
      }
      let machingItem;
      let selectedElement = document.getElementById(productId);
      let selectedVlaue = selectedElement.value;
      cart.forEach((item) => {
        if (productId === item.productId) {
          machingItem = item;
        }
      });

      if (machingItem) {
        machingItem.quantity += Number(selectedVlaue);
      }
      else {
        cart.push({
          productId,
          quantity: Number(selectedVlaue)
        });

      }

      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      })
      localStorage.setItem('cart', JSON.stringify(cart));
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });

  });



