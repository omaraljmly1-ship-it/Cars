import catalogJson from "./catalog.json";

function parseGenerationYearEnd(generation) {
  if (!generation) return 0;
  const yearEnd = generation.yearEnd || generation.years?.split("-").pop()?.trim();
  const yearNumber = parseInt(String(yearEnd || ""), 10);
  return Number.isFinite(yearNumber) ? yearNumber : 0;
}

function getLatestGenerationFromModel(model) {
  if (!model?.generations) return null;
  return Object.values(model.generations)
    .filter(Boolean)
    .sort((a, b) => parseGenerationYearEnd(b) - parseGenerationYearEnd(a))[0] || null;
}

export function getGenerationDisplayImage(generation) {
  if (!generation?.parts?.length) return null;

  const airSpringRegex = /air[- ]?spring|air[- ]?springs|air[- ]?bag|air[- ]?bags|air[- ]?suspension|air[- ]?suspensions|جامبين/i;
  const airSpringPart = generation.parts.find((part) => {
    const text = `${part.slug || ""} ${part.nameEn || ""} ${part.nameAr || ""}`.toLowerCase();
    return airSpringRegex.test(text);
  });

  if (airSpringPart?.image) {
    return airSpringPart.image;
  }

  const fallbackPart = generation.parts[generation.parts.length - 1] || generation.parts[0];
  return fallbackPart?.image || null;
}

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

  return Object.values(models)
    .map((model) => {
      let partsCount = 0;
      let generationsCount = 0;
      let latestImage = null;
      const latestGeneration = getLatestGenerationFromModel(model);

      if (model.generations) {
        const generationsList = Object.values(model.generations);
        generationsCount = generationsList.length;

        for (const gen of generationsList) {
          if (gen.parts) {
            partsCount += gen.parts.length;
          }
        }
      }

      if (latestGeneration) {
        latestImage = getGenerationDisplayImage(latestGeneration);
      }

      return {
        ...model,
        generationsCount,
        partsCount,
        latestYearEnd: parseGenerationYearEnd(latestGeneration),
        image: latestImage || "/images/models/fallback-model.jpg", // newest generation thumbnail or fallback
      };
    })
    .sort((a, b) => (b.latestYearEnd || 0) - (a.latestYearEnd || 0));
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
