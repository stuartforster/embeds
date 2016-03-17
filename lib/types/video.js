import getDimensions from '../dimensions';
import map from 'lodash.map';
import {element as h} from 'deku';

const type = 'video';

const getSources = elm => {
  const sourceElms = elm.getElementsByTagName('source');

  if (sourceElms.length) {
    return map(sourceElms, sourceElm => ({
      src: sourceElm.getAttribute('src'),
      type: sourceElm.getAttribute('type') || null
    }));
  }

  return [{
    src: elm.getAttribute('src'),
    type: null
  }];
};

export const parse = ([elm]) => {
  let tagName = elm.tagName.toLowerCase();

  if (tagName === 'video') {
    const {width, height} = getDimensions(elm);
    const sources = getSources(elm);

    return {
      type, sources, width, height
    };
  }

  return null;
};

const renderSource = ({src, type}) => h('source', {src, type});

export const render = ({type, sources, width, height}) =>
  h('video', {width, height}, sources.map(renderSource));
