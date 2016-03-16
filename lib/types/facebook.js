const type = 'facebook';

const parseElm = elm => {
  if (!elm.classList.contains('fb-post') && !elm.classList.contains('fb-video')) {
    return null;
  }

  const url = elm.getAttribute('data-href');
  const embedAs = elm.classList.contains('fb-video') ? 'video' : 'post';

  return { embedAs, type, url };
};

export const parse = elements => {
  for (let i = 0; i < elements.length; ++i) {
    let results = parseElm(elements[i]);
    if (results) {
      return results;
    }
  }
  return null;
};
