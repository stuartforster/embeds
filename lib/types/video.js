import getDimensions from '../dimensions';
import map from 'lodash.map';
import element from 'virtual-element';

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

const renderSource = ({src, type}) => <source src={src} type={type} />;

export const render = ({sources, width, height}) =>
  <video width={width} height={height}>
    {sources.map(renderSource)}
  </video>;
