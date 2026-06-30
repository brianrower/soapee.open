import _ from 'lodash';

const STORAGE_KEY = 'soapee.additives';

export function listAdditives() {
  return readAll();
}

export function getAdditive(id) {
  return _.find(readAll(), additive => String(additive.id) === String(id)) || null;
}

export function createAdditive({ name, notes }) {
  const additives = readAll();
  const additive = {
    id: nextId(additives),
    name,
    notes: notes || null
  };

  writeAll([...additives, additive]);

  return additive;
}

function nextId(additives) {
  return (_.max(_.map(additives, additive => Number(additive.id))) || 0) + 1;
}

export function updateAdditive(id, patch) {
  const additives = _.map(readAll(), additive => (
    String(additive.id) === String(id) ? { ...additive, ...patch } : additive
  ));

  writeAll(additives);

  return getAdditive(id);
}

export function deleteAdditive(id) {
  writeAll(_.reject(readAll(), additive => String(additive.id) === String(id)));
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function writeAll(additives) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(additives));
}
