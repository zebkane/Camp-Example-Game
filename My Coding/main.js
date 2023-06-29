let input = document.querySelector("input");
let button = document.querySelector("button");
let h1 = document.querySelector("h1");

function onButtonClick() {
  h1.innerHTML = input.value;
}
