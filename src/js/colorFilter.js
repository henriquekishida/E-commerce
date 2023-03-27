export {
  createElementWithClass,
  appendById,
  renderColorFilter,
  listColors,
}

import { createElementWithClass, appendById, onlyUnique } from "./helper"
import { renderProduct } from "./products"

function renderColorFilter(colors) {
  colors.forEach((color) => {
    let div = createElementWithClass('div', 'listed-color')
    div.innerHTML =
      `
      <div class="custom-checkbox">
      </div>
      <input type="checkbox" class="checkbox" data-color="${color}" id="color-${color}">
      <label for="color-${color}">
      ${color}
      </label>
      `
    appendById(div, 'colors')
  })

  let colorFilters = document.querySelectorAll("input[data-color]")

  colorFilters.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const enabledSettings =
        Array
          .from(colorFilters) // Convert checkboxes to an array to use filter and map.
          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
          .map(i => i.getAttribute('data-color')) // Use Array.map to extract only the checkbox values from the array of objects.

      console.log(enabledSettings)

      fetch(`http://localhost:5000/products`)
        .then((response) => response.json())
        .then((data) => {

          if (enabledSettings.length != 0) {
            let filteredData = []

            for (let i = 0; i < data.length; i++) {
              enabledSettings.forEach(color => {
                if (data[i].color.includes(color)) {
                  filteredData.push(data[i])
                }
              })
            }
            renderProduct(filteredData)

          } else {
            renderProduct(data)
          }
        })
    })
  })
}

function listColors(products) {
  let colors = []
  products.forEach(product => {
    colors.push(product.color)
  })
  return colors.filter(onlyUnique).sort()
}
