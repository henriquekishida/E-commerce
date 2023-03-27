export { displayCart, closeCart, addToCart, listCartItems, updateItemsCounter }
import { createElementWithClass, appendById } from "./helper"

function displayCart() {
  let div = document.createElement('div')
  div.innerHTML = `  <section id="cart">
                      <div class="container cart-container">
                        <section class="cartHeader">
                          <p>Carrinho</p>
                          <p class="close-window">X</p>
                        </section>
                        <section id="items">

                        </section>
                        <section class="cartFooter">
                          <div class="items-total">

                          </div>
                          <div class="checkout">
                            FINALIZAR COMPRA
                          </div>
                        </section>
                      </div>
                    </section>`
  let body = document.querySelector('body')
  body.appendChild(div)

  let closeCartButton = document.querySelector('.close-window')
  closeCartButton.addEventListener("click", function () { closeCart(div) })
}

function closeCart(div) {
  div.remove()
}

function addToCart(buyButton, cart) {
  let id = parseInt(buyButton.parentElement.querySelector('.product-id').innerText)

  if (cart.get(id) === undefined) {
    cart.set(id, { amt: 1 })
  }
  else {
    cart.get(id).amt++
  }
  updateItemsCounter(cart)
}

function listCartItems(cart, catalog) {
  let total = 0.00

  cart.forEach((item, id) => {
    let div = createElementWithClass('div', 'item')
    div.innerHTML = `
      <span class="remove-product">-</span>
      <div class="cart-product-img">

      </div>
      <div class="cart-product-info">

        <p class="cart-product-name">${catalog[id - 1].name}</p>
        <div class="prices">
          <div class="quantity">
            <div class="minus">
              <span>-</span>
            </div>
            <div class="amount-counter">
              ${item.amt}
            </div>
            <div class="add">
              <span>+</span>
            </div>
          </div>
          <div class="total">
            <p>Subtotal:</p>
            <p class="price-total">R$${parseFloat((catalog[id - 1].price) * item.amt).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `
    div.querySelector('.cart-product-img').style.backgroundImage = `url(${catalog[id - 1].image})`

    let addOne = div.querySelector('.add')
    addOne.addEventListener("click", function () { addOneProduct(id, cart, catalog) })

    let takeOne = div.querySelector('.minus')
    takeOne.addEventListener("click", function () { takeOneProduct(id, cart, catalog) })

    let removePr = div.querySelector('.remove-product')
    removePr.addEventListener("click", function () { removeProduct(id, cart, catalog) })
    appendById(div, 'items')

    total += parseFloat(catalog[id - 1].price * item.amt)
  });

  document.querySelector('.items-total').innerText = `TOTAL:\n R$${total.toFixed(2)}`
}

function addOneProduct(id, cart, catalog) {
  cart.get(id).amt++
  updateCart(cart, catalog)
  updateItemsCounter(cart)
}

function removeProduct(id, cart, catalog) {
  cart.delete(id)
  updateCart(cart, catalog)
  updateItemsCounter(cart)
}

function takeOneProduct(id, cart, catalog) {
  cart.get(id).amt--
  if (cart.get(id).amt === 0) {
    removeProduct(id, cart, catalog)
  }
  else {
    updateCart(cart, catalog)
  }
  updateItemsCounter(cart)
}

function updateCart(cart, catalog) {
  closeCart(document.getElementById('cart'))
  displayCart()
  listCartItems(cart, catalog)
}

function updateItemsCounter(cart) {
  let counter = document.querySelector('.amount-of-items')
  let total = 0
  cart.forEach((item) => {
    total += item.amt
  })

  counter.innerText = total
}

