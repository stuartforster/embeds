import getDimensions from '../dimensions';

const createImage = (img) => {
  const {width, height} = getDimensions(img);

  return {
    type: 'image',
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt') || undefined,
    width, height
  };
};

export const parse = ([elm]) => {
  const tagName = elm.tagName.toLowerCase();

  if (tagName === 'figure') {
    const img = elm.getElementsByTagName('img')[0];

    if (img) {
      return createImage(img);
    }
  } else if (tagName === 'img') {
    return createImage(elm);
  }

  return null;
};
