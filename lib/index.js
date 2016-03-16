import * as image from './types/image';
import * as video from './types/video';
import * as youtube from './types/youtube';
import * as twitter from './types/twitter';
import * as instagram from './types/instagram';
import * as facebook from './types/facebook';
import * as vine from './types/vine';
import * as custom from './types/custom';

const types = [
  image, video, youtube, twitter, instagram, facebook, vine,
  custom /* last element */
];

export const parse = elements => {
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
