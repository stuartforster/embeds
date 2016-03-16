import getDimensions from '../dimensions';

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
