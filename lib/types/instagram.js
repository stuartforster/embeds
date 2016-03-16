import last from 'lodash.last';

const type = 'instagram';

function testInstagramMediaEmbed (elm) {
  if (!elm.classList.contains('instagram-media')) {
    return null;
  }

  const paragraphs = elm.getElementsByTagName('p');
  if (!paragraphs[0]) {
    return null;
  }

  const postLink = paragraphs[0].getElementsByTagName('a')[0];
  const text = elm.hasAttribute('data-instgrm-captioned')
    ? postLink.childNodes[0].data : null;
  const url = postLink.getAttribute('href');
  const id = last(url.split('/').filter(Boolean));

  return { type, text, url, id };
}

const regexp = /https?:\/\/instagram\.com\/p\/([A-Za-z0-9_-]+)\/embed/;

function testInstagramIframe (elm) {
  if (elm.tagName.toLowerCase() !== 'iframe') {
    return null;
  }

  const url = elm.getAttribute('src') || '';
  const match = url.match(regexp);
  if (!match) {
    return null;
  }

  const id = match[1];

  return { type, text: '', url: `https://instagram.com/p/${id}`, id };
}

export const parse = ([elm]) => {
  return testInstagramMediaEmbed(elm) || testInstagramIframe(elm);
};
