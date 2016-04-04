import url from 'url';
import getDimensions from '../dimensions';
import {element} from 'deku';

export const parse = ([elm]) => {
  if (elm.tagName.toLowerCase() !== 'iframe') {
    return null;
  }

  const src = elm.getAttribute('src');
  const {width, height} = getDimensions(elm);
  if (!src || !width || !height) {
    return null;
  }

  const parsed = url.parse(src, false, true);
  const secure = parsed.protocol === 'https:' || parsed.protocol === null;
  return { type: 'custom', width, height, src, secure };
};

export const render = ({width, height, src}) =>
  <iframe src={src} width={width} height={height} frameborder='0'></iframe>;
