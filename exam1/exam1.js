const p = document.querySelector("p");
p.style.visibility = "hidden";
let pattern = /o/g;

let contentVisibility = window.prompt(
  "voudriez vous voir le contunu du paragraphe(o/n?"
);
if (pattern.test(contentVisibility)) {
  p.style.visibility = "visible";
}
