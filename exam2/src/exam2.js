import { render } from "./utils/utils.js";
const buttons = [
  {
    type: "button",
    props: { id: "btn-header" },
    children: ["Créer un header "],
  },
  { type: "button", props: { id: "btn-main" }, children: ["Créer un main "] },
  {
    type: "button",
    props: { id: "btn-footer" },
    children: ["Créer un footer"],
  },
];
const futureRenders = [
  { type: "header", props: { undefined }, children: ["Header ici"] },
  { type: "main", props: { undefined }, children: ["main ici"] },
  { type: "footer", props: { undefined }, children: ["footer ici"] },
];
buttons.forEach((elem) => {
  render(elem, document.body);
});
const myButtons = document.querySelectorAll("button");
myButtons.forEach((button, i) => {
  button.addEventListener("click", function () {
    console.log(this);
    render(futureRenders[i], document.body);
    this.remove();
  });
});
