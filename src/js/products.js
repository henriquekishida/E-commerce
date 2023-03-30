import { filterByPrice } from "./priceFilter"
import { filterBySize } from "./sizeFilter"
import { addToCart, listCartItems, displayCart } from "./cart"

let cart = new Map()

export function renderProduct(data) {

  const quantity = 9
  let products = data.slice(0, quantity)

  const BRL = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  let div = products.map((product) =>
    `
        <div class="product">
          <img class="productImg" src="${product.image}" alt="${product.name}">
          <p class="productName">${product.name}</p>
          <p class="productPrice">${BRL(product.price)}</p>
          <p class="parcel">
            Até ${product.parcelamento[0]}x de 
            ${BRL(product.parcelamento[1])}
          </p>
          <div class="buy">
            COMPRAR
          </div>
          <div class="productColor hidden-info">
            ${product.color}
          </div>
          <div class="product-id hidden-info">
            ${product.id}
          </div>
        </div>
        `
  ).join("")
  document.getElementById('products').innerHTML = div

  let buyButtons = document.querySelectorAll('.buy')
  buyButtons.forEach(buyButton => {
    buyButton.addEventListener("click", function () { addToCart(buyButton, cart) })
  })
}

filterByPrice()
filterBySize()
