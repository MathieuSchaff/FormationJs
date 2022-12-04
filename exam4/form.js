import { createElement } from "./utils/createElement.js";
import { Select } from "./components/Select.js";
import { fetchGeo } from "./utils/fetchGeo.js";

const region = document.querySelector("#region");
const departements = document.querySelector("#departements");
const communes = document.querySelector("#communes");

class App {
  async init() {
    const dataRegion = await fetchGeo("https://geo.api.gouv.fr/regions");
    const optionRegions = new Select(dataRegion, region);
    optionRegions.renderOptions();
  }
}
region.addEventListener("change", async function () {
  let dataDeps = await fetchGeo(
    `https://geo.api.gouv.fr/regions/${region.value}/departements`
  );
  departements.innerHTML = `<option value="">Chosir région avant</option>`;
  communes.innerHTML = `<option value="">Chosir région avant</option>`;
  if (document.querySelector("section"))
    document.querySelector("section").remove();
  const optionsDeps = new Select(dataDeps, departements);
  optionsDeps.renderOptions();
});

departements.addEventListener("change", async function () {
  let dataCommunes = await fetchGeo(
    `https://geo.api.gouv.fr/departements/${departements.value}/communes`
  );
  communes.innerHTML = "";
  if (document.querySelector("section"))
    document.querySelector("section").remove();
  const optionsCommunes = new Select(dataCommunes, communes);
  optionsCommunes.renderOptions();
});
communes.addEventListener("change", async function () {
  if (document.querySelector("section"))
    document.querySelector("section").remove();
  let dataCommune = await fetchGeo(
    `https://geo.api.gouv.fr/communes/${communes.value}`
  );
  document.body.insertAdjacentElement(
    "beforeend",
    createDataCommune(dataCommune)
  );
});
function createDataCommune(commune) {
  if (document.querySelector("section"))
    document.querySelector("section").remove();
  const myCommune = createElement("section", {}, [
    createElement("p", {}, `Nom de la commune: ${commune.nom}`),
    createElement("p", {}, `Code postal: ${commune.code}`),
    createElement("p", {}, `Nombre d'habitants: ${commune.population}`),
  ]);
  return myCommune;
}

const myApp = new App();
myApp.init();
