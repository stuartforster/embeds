import parseText from '../parse-text';
import renderText from '../render-text';
import element from 'virtual-element';

const type = 'tumblr';

export const parse = ([elm]) => {
  if (!elm.classList.contains('tumblr-post')) {
    return null;
  }

  const did = elm.getAttribute('data-did');
  const url = elm.getAttribute('data-href');
  const text = parseText(elm);

  return {type, did, url, text};
};

export const render = ({did, url, text}) =>
  <div class='tumblr-post' data-href={url} data-did={did}>
    {renderText(text)}
  </div>
;
