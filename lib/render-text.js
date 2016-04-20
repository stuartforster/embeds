import element from 'magic-virtual-element';

export default text =>
  (text || []).map(({content, href}) =>
    href
    ? <a href={href}>{content}</a>
    : content
  );
