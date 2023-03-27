import { renderColorFilter, listColors } from "./colorFilter"
import { addToCart, listCartItems, displayCart } from "./cart"
import { renderProduct } from "./products"

const url = `http://localhost:5000/products`

//Selecting for sort options
let recent = [...document.querySelectorAll(".recent")]
let lower = [...document.querySelectorAll(".lower")]
let highest = [...document.querySelectorAll(".highest")]

let sortBy = document.querySelector(".sort")
let dropdown = document.querySelector(".dropdown")
let isShown = true
//

let filterBtn = document.querySelector(".filterBtn")
let sortBtn = document.querySelector(".sortBtn")
let filter = document.querySelector(".filter")
let sortByMobile = document.querySelector(".sortByMobile")

let closeBtn = document.querySelector(".close")
let closeBtn1 = document.querySelector(".close1")
const showButton = document.querySelector(".loadMoreButton")

filterBtn.addEventListener("click", showMobileFilters)
sortBtn.addEventListener("click", showMobileSort)
closeBtn.addEventListener("click", close)
closeBtn1.addEventListener("click", close)
showButton.addEventListener("click", loadMore)
sortBy.addEventListener("click", showSort)

function render() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderProduct(data)
      renderColorFilter(listColors(data))
      let cart = new Map()

      let buyButtons = document.querySelectorAll('.buy')
      buyButtons.forEach(buyButton => {
        buyButton.addEventListener("click", function () { addToCart(buyButton, cart) })
      })

      let cartButton = document.getElementById('cart-link')
      cartButton.addEventListener("click", function () { displayCart(), listCartItems(cart, data) })
    })
}

render()

function loadMore() {
  render()
}

function showSort() {
  if (isShown) {
    dropdown.style.display = "none"
    isShown = false
  } else {
    dropdown.style.display = "block"
    isShown = true
  }
}

function showMobileFilters() {
  filter.style.display = "block"
}

function close() {
  sortByMobile.style.display = "none"
  filter.style.display = "none"
}

function showMobileSort() {
  sortByMobile.style.display = "block"
}

// Section to sort by
lower.map((e) => {
  e.addEventListener("click", () => {
    fetch('http://localhost:5000/products?_sort=price&_order=asc')
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector('.sortP').innerText = "Menor preço"
        close()
        renderProduct(data)
      })
  })
})

highest.map((e) => {
  e.addEventListener("click", () => {
    fetch('http://localhost:5000/products?_sort=price&_order=desc')
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector('.sortP').innerText = "Maior preço"
        close()
        renderProduct(data)
      })
  })
})

recent.map((e) => {
  e.addEventListener("click", () => {
    fetch('http://localhost:5000/products?_sort=date&_order=desc')
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector('.sortP').innerText = "Mais recente"
        close()
        renderProduct(data)
      })
  })
})