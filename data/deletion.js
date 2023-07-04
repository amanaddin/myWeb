document.querySelectorAll('.js-delete-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const updatedCartData = cartData.filter((item) => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    location.reload();
  });
});