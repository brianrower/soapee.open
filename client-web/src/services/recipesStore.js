import _ from 'lodash';

import oilsData from 'data/oils.json';

import { getAdditive } from 'services/additivesStore';

const STORAGE_KEY = 'soapee.recipes';

export function listRecipes() {
  return _.orderBy(readAll(), ['updatedAt'], ['desc']);
}

export function getRecipe(id) {
  return _.find(readAll(), recipe => String(recipe.id) === String(id)) || null;
}

export function createRecipe(payload) {
  const now = Date.now();
  const record = {
    ...payloadToRecord(payload),
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now
  };

  writeAll([...readAll(), record]);

  return record;
}

export function updateRecipe(id, payload) {
  const existing = getRecipe(id);
  const record = {
    ...payloadToRecord(payload),
    id,
    createdAt: existing ? existing.createdAt : Date.now(),
    updatedAt: Date.now()
  };

  writeAll(_.map(readAll(), recipe => (String(recipe.id) === String(id) ? record : recipe)));

  return record;
}

export function deleteRecipe(id) {
  writeAll(_.reject(readAll(), recipe => String(recipe.id) === String(id)));
}

export function importRecipe(record) {
  if (!record || !record.settings || !_.isArray(record.recipeOils)) {
    throw new Error('File is not a valid Soapee recipe.');
  }

  const now = Date.now();
  const imported = {
    ..._.omit(record, ['id']),
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now
  };

  writeAll([...readAll(), imported]);

  return imported;
}

function payloadToRecord({ name, description, notes, summary, settings }) {
  const { oils, additives, ...cleanSettings } = settings;

  return {
    name,
    description: description || null,
    notes: notes || null,
    summary,
    settings: cleanSettings,
    recipeOils: _.map(oils, ({ id, weight }) => ({
      oilId: String(id),
      weight,
      oil: { id: String(id), name: oilName(id) }
    })),
    recipeAdditives: _.map(additives, ({ id, weight }) => ({
      additiveId: id,
      weight,
      additive: { id, name: additiveName(id) }
    }))
  };
}

function oilName(id) {
  const oil = _.find(oilsData, candidate => String(candidate.id) === String(id));

  return oil ? oil.name : `Oil ${id}`;
}

function additiveName(id) {
  const additive = getAdditive(id);

  return additive ? additive.name : `Additive ${id}`;
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function writeAll(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}
