export { createElementWithClass, appendById, onlyUnique }

function createElementWithClass(element, cssClass) {
  let el = document.createElement(element)
  el.classList.add(cssClass)

  return el
}

function appendById(appendable, id) {
  let parent = document.getElementById(id)
  parent.appendChild(appendable)
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
