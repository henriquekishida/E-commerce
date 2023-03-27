import { renderProduct } from "./products"

let sizeCheckboxes = document.querySelectorAll("input[name=size]")

export function filterBySize() {

  sizeCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener('change', () => {

      const enabledSettings =
        Array
          .from(sizeCheckboxes) // Convert checkboxes to an array to use filter and map.
          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
          .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

      console.log(enabledSettings)

      fetch(`http://localhost:5000/products`)
        .then((response) => response.json())
        .then((data) => {

          if (enabledSettings.length != 0) {
            let filteredData = []

            for (let i = 0; i < data.length; i++) {
              enabledSettings.forEach(size => {
                if (data[i].size.includes(size)) {
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
