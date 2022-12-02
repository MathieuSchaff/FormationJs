import { createElement } from "./utils/createElement.js";
import { Select } from "./components/selectCreator.js";
import { fetchGeo } from "./utils/fetchGeo.js";
class FormApp {
  async render() {
    const form = createElement("form", {
      method: "",
      action: "",
      id: "upperForm",
    });
    document.querySelector(".app").insertAdjacentElement("afterbegin", form);
    const dataRegion = await fetchGeo("https://geo.api.gouv.fr/regions");
    const select = new Select(dataRegion, "region");
    select.render();
  }
}

const myApp = new FormApp();
myApp.render();
