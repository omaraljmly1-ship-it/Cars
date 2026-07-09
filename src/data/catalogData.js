import catalogJson from "./catalog.json";

/**
 * Returns the full catalog data.
 */
export function getCatalog() {
  return catalogJson;
}

/**
 * Returns the data for a specific brand.
 * @param {string} brandSlug 
 */
export function getCatalogBrand(brandSlug) {
  if (!brandSlug) return null;
  const brand = catalogJson.brands[brandSlug.toLowerCase()];
  return brand || null;
}

/**
 * Returns the models for a brand.
 * @param {string} brandSlug 
 * @returns {Object|null} Map of models or null
 */
export function getCatalogModels(brandSlug) {
  const brand = getCatalogBrand(brandSlug);
  return brand ? brand.models : null;
}

/**
 * Returns a list of all models for a brand with their parts count and metadata.
 * @param {string} brandSlug 
 * @returns {Array} List of models
 */
export function getAllCatalogModels(brandSlug) {
  const models = getCatalogModels(brandSlug);
  if (!models) return [];

  return Object.values(models).map((model) => {
    let partsCount = 0;
    let generationsCount = 0;
    let firstPartImage = null;

    if (model.generations) {
      const generationsList = Object.values(model.generations);
      generationsCount = generationsList.length;
      
      for (const gen of generationsList) {
        if (gen.parts) {
          partsCount += gen.parts.length;
          if (!firstPartImage && gen.parts.length > 0) {
            firstPartImage = gen.parts[0].image;
          }
        }
      }
    }

    return {
      ...model,
      generationsCount,
      partsCount,
      image: firstPartImage || "/images/models/fallback-model.jpg", // dynamic thumbnail or fallback
    };
  });
}

/**
 * Returns generations for a model.
 * @param {string} brandSlug 
 * @param {string} modelSlug 
 */
export function getCatalogGenerations(brandSlug, modelSlug) {
  const brand = getCatalogBrand(brandSlug);
  if (!brand || !brand.models) return null;
  const model = brand.models[modelSlug.toLowerCase()];
  return model ? model.generations : null;
}

/**
 * Returns parts for a generation.
 * @param {string} brandSlug 
 * @param {string} modelSlug 
 * @param {string} generationSlug 
 * @returns {Array} Parts array
 */
export function getCatalogParts(brandSlug, modelSlug, generationSlug) {
  const generations = getCatalogGenerations(brandSlug, modelSlug);
  if (!generations) return [];
  const gen = generations[generationSlug.toLowerCase()];
  return gen && gen.parts ? gen.parts : [];
}

/**
 * Returns a flat list of all parts across all models for a brand.
 * @param {string} brandSlug 
 * @returns {Array} Flat array of parts
 */
export function getAllCatalogParts(brandSlug) {
  const models = getCatalogModels(brandSlug);
  if (!models) return [];

  const allParts = [];
  for (const model of Object.values(models)) {
    if (model.generations) {
      for (const gen of Object.values(model.generations)) {
        if (gen.parts) {
          for (const part of gen.parts) {
            allParts.push({
              ...part,
              modelSlug: model.slug,
              modelNameEn: model.nameEn,
              modelNameAr: model.nameAr,
              generationSlug: gen.slug,
              generationCode: gen.code,
              generationYears: gen.years,
            });
          }
        }
      }
    }
  }
  return allParts;
}
