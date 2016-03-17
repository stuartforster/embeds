import find from 'lodash.find';
import last from 'lodash.last';
import map from 'lodash.map';
import {element} from 'deku';

const type = 'twitter';

const getText = elm => {
  const pElm = elm.getElementsByTagName('p')[0];
  if (!pElm) {
    return [];
  }

  return map(pElm.childNodes, (child) => {
    if (child.nodeName === '#text') {
      return {
        content: child.data,
        href: null
      };
    }

    if (child.tagName.toLowerCase() === 'a') {
      return {
        content: child.childNodes[0].data,
        href: child.getAttribute('href')
      };
    }
  }).filter(Boolean);
};

const getUser = elm => {
  const userElm = find(elm.childNodes, child => child.nodeName === '#text');
  if (!userElm) {
    return {
      name: null,
      slug: null
    };
  }
  const userString = userElm.data;
  const lastIndex = userString.lastIndexOf('(');
  const userName = userString.slice(2, lastIndex).trim();
  const userSlug = userString.slice(lastIndex + 2, -2);

  return {
    name: userName,
    slug: userSlug
  };
};

export const parse = ([elm]) => {
  if (!elm.classList.contains('twitter-tweet')) {
    return null;
  }

  const aElm = last(elm.getElementsByTagName('a'));
  const url = aElm.getAttribute('href');
  const id = last(url.split('/').filter(Boolean));
  const date = aElm.childNodes.length > 0 ? aElm.childNodes[0].data : '';
  const user = getUser(elm);
  const text = getText(elm);

  if (!/^\d+$/.test(id)) {
    return null;
  }

  return { user, date, text, id, url, type };
};

const renderText = text =>
  text.map(({content, href}) =>
    href
    ? <a href={href}>{content}</a>
    : content
  );

export const render = ({text, url, date, user, id}) =>
  <blockquote class='twitter-tweet' lang='en'>
    <p lang='en' dir='ltr'>{renderText(text)}</p>
    {`&mdash; ${user.name} (@${user.slug}) `}
    <a href={url}>{date}</a>
  </blockquote>;
