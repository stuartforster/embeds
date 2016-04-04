import startsWith from 'lodash.startswith';
import { parse as parseEmbedly } from 'embedly-url';
import {element} from 'deku';

const type = 'vine';

const checkSrc = src => startsWith(src, 'https://vine.co/v/');
const regexp = /https:\/\/vine\.co\/v\/([^\/]+)/;

export const parse = ([elm]) => {
  if (elm.tagName.toLowerCase() !== 'iframe') {
    return null;
  }

  const src = elm.getAttribute('src');
  if (!src) {
    return null;
  }

  const embedlyParsed = parseEmbedly(src);

  const url = embedlyParsed ? embedlyParsed.src : src;
  if (!checkSrc(url)) {
    return null;
  }

  const match = url.match(regexp);
  const id = match[1];

  return { type, url, id };
};

export const render = ({url}) =>
  <iframe src={url} width="600" height="600" frameborder="0"></iframe>;
