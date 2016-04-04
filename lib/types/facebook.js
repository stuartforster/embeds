const type = 'facebook';
import {element} from 'deku';

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

const renderVideo = ({url, user, text, headline, date}) =>
  (<div class='fb-video' data-allowfullscreen='1' data-href={url}>
    <div class='fb-xfbml-parse-ignore'>
      <blockquote cite={url}>
        <a href={url}>{headline}</a>
        <p>{text}</p>
        Posted by <a href={user.url}>{user.name}</a> on {date}
      </blockquote>
    </div>
  </div>);

const renderPost = ({url, user, date, text}) =>
  (<div class='fb-post' data-href={url} data-width='500'>
    <div class='fb-xfbml-parse-ignore'>
      <blockquote cite={url}>
        <p>{text}</p>
        Posted by <a href='#' role='button'>{user}</a> on <a href={url}>{date}</a>
      </blockquote>
    </div>
  </div>);

export const render = opts => opts.embedAs === 'post' ? renderPost(opts) : renderVideo(opts);
