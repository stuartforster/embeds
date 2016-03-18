import test from 'ava';
import 'babel-core/register';
import {render as _render} from '../lib';
import tsml from 'tsml';
import {string} from 'deku';

const render = opts => string.render(_render(opts));

test('render() img', t => {
  const actual = render({
    type: 'image',
    src: 'http://example.com/image.jpg',
    width: undefined,
    height: undefined,
    alt: undefined
  });
  const expected = '<img src="http://example.com/image.jpg"></img>';
  t.same(actual, expected);
});

test('render() img, with alt-attribute', t => {
  const actual = render({
    type: 'image',
    src: 'http://example.com/image.jpg',
    width: undefined,
    height: undefined,
    alt: 'beep boop'
  });
  const expected = '<img src="http://example.com/image.jpg" alt="beep boop"></img>';
  t.same(actual, expected);
});

test('render() img with width & height', t => {
  const actual = render({
    type: 'image',
    src: 'http://example.com/image.jpg',
    width: 100,
    height: 200,
    alt: undefined
  });
  const expected = '<img src="http://example.com/image.jpg" width="100" height="200"></img>';
  t.same(actual, expected);
});

test('render() video  ', t => {
  const actual = render({
    type: 'video',
    sources: [{
      src: 'http://example.com/video.mp4',
      type: null
    }, {
      src: 'http://example.com/video2.mp4',
      type: 'video/mp4'
    }],
    width: 100,
    height: 200
  });
  const expected = tsml`<video width="100" height="200">
    <source src="http://example.com/video.mp4"></source>
    <source src="http://example.com/video2.mp4" type="video/mp4"></source>
  </video>`;
  t.same(actual, expected);
});

test('render() youtube iframe', t => {
  const actual = render({
    type: 'youtube',
    youtubeId: 'pDVmldTurqk'
  });
  const expected = '<iframe src="https://www.youtube.com/embed/pDVmldTurqk"></iframe>';
  t.same(actual, expected);
});

test('render() tweet - normal', t => {
  const input = {
    type: 'twitter',
    text: [
      { content: 'GIF vs. JIF… This ', href: null },
      { content: 'pic.twitter.com/qFAHWgdbL6', href: 'https://t.co/qFAHWgdbL6' }
    ],
    url: 'https://twitter.com/MattNavarra/status/684690494841028608',
    date: 'January 6, 2016',
    user: {
      slug: 'MattNavarra',
      name: 'Matt (foo) Navarra'
    },
    id: '684690494841028608'
  };
  const actual = render(input);
  const expected = tsml`<blockquote class="twitter-tweet" lang="en">
    <p lang="en" dir="ltr">GIF vs. JIF… This <a href="https://t.co/qFAHWgdbL6">pic.twitter.com/qFAHWgdbL6</a></p>&mdash; Matt (foo) Navarra (@MattNavarra) <a href="https://twitter.com/MattNavarra/status/684690494841028608">January 6, 2016</a>
  </blockquote>`;
  t.same(actual, expected);
});
test('render() instagram - with caption', t => {
  const input = {
    type: 'instagram',
    id: '-7PIhyA6J3',
    url: 'https://www.instagram.com/p/-7PIhyA6J3/',
    text: 'Reinsta @karinn In Berlin. Feeling awesome.',
    user: {
      name: 'David Björklund',
      slug: 'david_bjorklund'
    },
    date: {
      utc: '2015-12-05T21:40:53+00:00',
      string: 'Dec 5, 2015 at 1:40pm PST'
    }
  };
  const actual = render(input);
  const expected = tsml`<blockquote class="instagram-media" data-instgrm-captioned="true" data-instgrm-version="6" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
    <div style="padding:8px;">
      <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;">
        <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div>
      </div>
      <p style=" margin:8px 0 0 0; padding:0 4px;">
        <a href="https://www.instagram.com/p/-7PIhyA6J3/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">
          Reinsta @karinn In Berlin. Feeling awesome.
        </a>
      </p>
      <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
        A photo posted by David Björklund (@david_bjorklund) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2015-12-05T21:40:53+00:00">Dec 5, 2015 at 1:40pm PST</time>
      </p>
    </div>
  </blockquote>`;
  t.same(actual, expected);
});
