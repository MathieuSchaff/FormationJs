// https://geo.api.gouv.fr/regions

// XX = numéro région
// https://geo.api.gouv.fr/regions/xx/departements

// XX = numéro département

// https://geo.api.gouv.fr/departements/xx/communes

// https://geo.api.gouv.fr/communes/xxxxx
// Il faut remplacer xxxxx par le code de la commune

export async function fetchGeo(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data || !response.ok) {
      throw new Error("Failed to fetch");
    }
    return data;
  } catch (err) {
    console.log("error:", err);
  }
}
