import { render } from "./utils/render.js";

render(
  {
    type: "img",
    props: {
      src: "https://media.auchan.fr/d87f5bf0-733c-417f-a3f6-7e57d6dd898c_256x256/B2CD/",
    },
    children: [""],
  },
  document.body
);
function moveAndDisappear(elem) {
  let elemWidth = elem.offsetWidth;
  let bodyWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let i = 0;
  const timer = setInterval(() => {
    i += 2;
    elem.style.left = i + "px";
    if (i == bodyWidth + elemWidth) {
      clearInterval(timer);
      elem.remove();
    }
  }, 10);
}
const myImg = document.querySelector("img");
myImg.addEventListener("click", function () {
  moveAndDisappear(this);
});
