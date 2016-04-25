import element from 'virtual-element';

export default text =>
  (text || []).map(({content, href}) =>
    href
    ? <a href={href}>{content}</a>
    : content
  );
