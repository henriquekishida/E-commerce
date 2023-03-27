import { renderProduct } from "./products"

let priceFilters = document.querySelectorAll("input[name=price]")

export function filterByPrice() {

  priceFilters.forEach((checkbox) => {

    checkbox.addEventListener('change', () => {

      const enabledSettings =
        Array
          .from(priceFilters) // Convert checkboxes to an array to use filter and map.
          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
          .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

      fetch(`http://localhost:5000/products`)
        .then((response) => response.json())
        .then((data) => {
          console.log(enabledSettings)
          const priceRanges = {
            upTo50: { min: 0, max: 50 },
            upTo150: { min: 51, max: 150 },
            upTo300: { min: 151, max: 300 },
            upTo500: { min: 301, max: 500 },
            above500: { min: 501, max: Infinity },
          }
          const filteredData = data.filter(product => {
            const price = Number(product.price)
            return enabledSettings.every(priceFilter => {
              const range = priceRanges[priceFilter]
              return price >= range.min && price <= range.max
            })
          })
          renderProduct(filteredData)
        })
    })
  })
}
