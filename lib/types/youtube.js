import { parse as parseEmbedly } from 'embedly-url';
import getYoutubeId from 'get-youtube-id';

export const parse = ([elm]) => {
  let tagName = elm.tagName.toLowerCase();

  if (tagName !== 'iframe') {
    return null;
  }

  const src = elm.getAttribute('src');
  if (!src) {
    return null;
  }

  const embedlyParsed = parseEmbedly(src);
  const youtubeId = embedlyParsed
    ? getYoutubeId(embedlyParsed.src) : getYoutubeId(src);
  return youtubeId && {
    type: 'youtube',
    youtubeId
  };
};
