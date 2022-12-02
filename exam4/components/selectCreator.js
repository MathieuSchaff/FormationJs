import { createElement } from "../utils/createElement.js";
import { fetchGeo } from "../utils/fetchGeo.js";
export class Select {
  constructor(data, place) {
    this.data = data;
    this.selectedOption = "";
    this.place = place;
  }
  createSelect() {
    const mySelect = createElement(
      "div",
      {
        class: ` selectContainer selectContainer-${this.place}`,
        "data-id": `${this.place}`,
      },
      [
        createElement("label", { for: `${this.place}` }, ``),
        createElement("select", { id: `${this.place}` }, [
          createElement("option", { value: "" }, "Please choose an option"),
          ...this.data.map((option) =>
            createElement(
              "option",
              { value: `${option.code}` },
              `${option.nom}`
            )
          ),
        ]),
      ]
    );
    return mySelect;
  }
  render() {
    document
      .querySelector("#upperForm")
      .insertAdjacentElement("beforeend", this.createSelect());
    const select = document.querySelector(`#${this.place}`);
    const selectId = `${this.place}`;
    select.addEventListener("change", async function (e) {
      if (
        (e.target.getAttribute("id") === "region" &&
          document.querySelector("selectContainer-departement")) ||
        document.querySelector("selectContainer-communes")
      ) {
        document.querySelector("selectContainer-departement").remove();
        document.querySelector("selectContainer-communes").remove();
      }
      if (
        e.target.getAttribute("id") === "departement" &&
        document.querySelector("selectContainer-communes")
      ) {
        document.querySelector("selectContainer-departement").remove();

        document.querySelector("selectContainer-communes").remove();
      }
      if (selectId === "region") {
        console.log("region");
        const dataDep = await fetchGeo(
          `https://geo.api.gouv.fr/regions/${e.target.value}/departements`
        );

        const selectDep = new Select(dataDep, "departement");
        console.log("selectDep: ", selectDep);
        selectDep.render();
      }
      if (selectId === "departement") {
        const dataCom = await fetchGeo(
          `https://geo.api.gouv.fr/departements/${e.target.value}/communes`
        );
        const selectCom = new Select(dataCom, "communes");
        console.log("dataCom: ", selectCom);

        selectCom.render();
      }
      if (selectId === "communes") {
        const dataCommune = await fetchGeo(
          ` https://geo.api.gouv.fr/communes/${e.target.value}`
        );
        console.log("daaCommune:: ", dataCommune);
        document.body.insertAdjacentElement(
          "beforeend",
          createDataCommune(dataCommune)
        );
      }
    });
  }
}
function createDataCommune(commune) {
  if (document.querySelector("section"))
    document.querySelector("section").remove();
  const myCommune = createElement("section", {}, [
    createElement("p", {}, commune.nom),
    createElement("p", {}, commune.code),
    createElement("p", {}, commune.population),
  ]);
  return myCommune;
}
