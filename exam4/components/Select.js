import { createElement } from "../utils/createElement.js";
import { fetchGeo } from "../utils/fetchGeo.js";
export class Select {
  constructor(data, parentOfOptions) {
    this.data = data;
    this.parentOfOptions = parentOfOptions;
    this.options = [];
  }
  createOptions() {
    const mySelect = [
      createElement("option", { value: "" }, "Please choose an option"),
      ...this.data.map((option) =>
        createElement("option", { value: `${option.code}` }, `${option.nom}`)
      ),
    ];
    this.options = mySelect;
    return this.options;
  }
  renderOptions() {
    this.createOptions();
    if (this.options.length > 0) {
      this.createOptions().forEach((elem) => {
        this.parentOfOptions.appendChild(elem);
      });
    }
  }
}
