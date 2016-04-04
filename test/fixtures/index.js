import {readFileSync} from 'fs';

export default {
  instagramCaption: readFileSync(`${__dirname}/instagram.html`, 'utf8').trim(),
  instagramWithoutCaption:
    readFileSync(`${__dirname}/instagram-no-caption.html`, 'utf8').trim(),
  facebookPost: readFileSync(`${__dirname}/facebook-post.html`, 'utf8').trim(),
  facebookVideo: readFileSync(`${__dirname}/facebook-video.html`, 'utf8').trim()
};
