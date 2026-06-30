import _ from 'lodash';

import { importRecipe } from 'services/recipesStore';

export function exportRecipe(record) {
  const json = JSON.stringify(_.omit(record, ['id']), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = `${fileName(record.name)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function importRecipeFile(file) {
  return readFile(file)
    .then(text => JSON.parse(text))
    .then(record => importRecipe(record));
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function fileName(name) {
  return _.kebabCase(name) || 'soapee-recipe';
}
