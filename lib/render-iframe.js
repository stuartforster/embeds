/* eslint-disable deku/no-unknown-property */
import element from 'virtual-element';

export default ({src, width, height, allowFullscreen}) =>
  <iframe
    src={src}
    width={width}
    height={height}
    frameborder='0'
    allowfullscreen={allowFullscreen}
    />;
