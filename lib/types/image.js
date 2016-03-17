import getDimensions from '../dimensions';
import {element as h} from 'deku';

export const parse = ([elm]) => {
  const tagName = elm.tagName.toLowerCase();

  if (tagName === 'img') {
    const {width, height} = getDimensions(elm);

    return {
      type: 'image',
      src: elm.getAttribute('src'),
      alt: elm.getAttribute('alt') || undefined,
      width, height
    };
  }

  return null;
};

export const render = ({type, src, alt, width, height}) =>
  h('img', { src, alt, width, height });
