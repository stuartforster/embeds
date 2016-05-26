import * as image from './image';
import * as video from './video';
import * as youtube from './youtube';
import * as twitter from './twitter';
import * as instagram from './instagram';
import * as facebook from './facebook';
import * as vine from './vine';
import * as spotify from './spotify';
import * as custom from './custom';
import assert from 'assert';
import forEach from 'lodash.foreach';

const types = {
  image, video, youtube, twitter, instagram, facebook, vine, spotify,
  custom /* last element */
};

forEach(types, (type, key) => {
  assert(type, `type ${key} exists`);
  assert(type.render, `type ${key} has a .render method`);
  assert(type.parse, `type ${key} has a .parse method`);
});

export default types;
