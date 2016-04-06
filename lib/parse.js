import values from 'lodash.values';
import _types from './types';

const types = values(_types);

export default elements => {
  if (elements && !Array.isArray(elements)) {
    elements = [elements];
  }
  if (elements && elements.length) {
    for (let i = 0; i < types.length; i++) {
      let type = types[i];
      let results = type.parse(elements);
      if (results) {
        return results;
      }
    }
  }
  return null;
};
