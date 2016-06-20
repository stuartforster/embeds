import getDimensions from '../dimensions';
import element from 'virtual-element';

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
  <img src={src} alt={alt} width={width} height={height} />;
