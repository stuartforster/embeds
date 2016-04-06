import test from 'ava';
import 'babel-core/register';
import {parseInput} from '../lib';
import tsml from 'tsml';

test('parse invalid input', t => {
  t.same(parseInput(), null);
  t.same(parseInput(null), null);
  t.same(parseInput(''), null);
  t.same(parseInput('https://unknown.com/embed/ABCde'), null);
});

test('parse instagram', t => {
  const expected = {
    type: 'instagram',
    text: '',
    url: 'https://www.instagram.com/p/tsxp1hhQTG',
    id: 'tsxp1hhQTG'
  };

  t.same(parseInput('https://www.instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('http://www.instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('//www.instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('https://instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('http://instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('//instagram.com/p/tsxp1hhQTG'), expected);
  t.same(parseInput('https://instagram.com/p/tsxp1hhQTG/'), expected);
  t.same(parseInput('http://instagram.com/p/tsxp1hhQTG/'), expected);
  t.same(parseInput('//instagram.com/p/tsxp1hhQTG/'), expected);
  t.same(parseInput('https://instagram.com/p/tsxp1hhQTG/embed'), expected);
  t.same(parseInput('http://instagram.com/p/tsxp1hhQTG/embed'), expected);
  t.same(parseInput('//instagram.com/p/tsxp1hhQTG/embed'), expected);
  t.same(parseInput('<iframe src="//instagram.com/p/tsxp1hhQTG"></iframe>'), expected);
});

test('giphy', t => {
  const expected = {
    type: 'giphy',
    text: '',
    url: 'https://giphy.com/embed/3oxRmeLK7bjcq0CCCA',
    id: '3oxRmeLK7bjcq0CCCA'
  };

  const code = tsml`
    <iframe src="//giphy.com/embed/3oxRmeLK7bjcq0CCCA" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    <p>
      <a href="http://giphy.com/gifs/new-girl-fox-new-girl-newgirl-3oxRmeLK7bjcq0CCCA">
        via GIPHY
      </a>
    </p>`;

  t.same(parseInput('https://giphy.com/embed/3oxRmeLK7bjcq0CCCA'), expected);
  t.same(parseInput('http://giphy.com/embed/3oxRmeLK7bjcq0CCCA'), expected);
  t.same(parseInput('//giphy.com/embed/3oxRmeLK7bjcq0CCCA'), expected);
  t.same(parseInput(code), expected);
});

test('facebook', t => {
  const videoCode = tsml`
    <div id="fb-root"></div>
    <script>
      (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s);
       js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
       fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));
    </script>
    <div class="fb-video" data-allowfullscreen="1" data-href="https://www.facebook.com/MicMedia/videos/1095905927098863/">
      <div class="fb-xfbml-parse-ignore">
        <blockquote cite="https://www.facebook.com/MicMedia/videos/1095905927098863/">
          <a href="https://www.facebook.com/MicMedia/videos/1095905927098863/">
            This exoskeleton is literally changing lives.
          </a>
        <p>An incredible device is helping paraplegics walk again. #MicCheckNow</p>
        Posted by <a href="https://www.facebook.com/MicMedia/">Mic</a> on Thursday, March 17, 2016
        </blockquote>
      </div>
    </div>`;

  const postCode = tsml`
    <div id="fb-root"></div>
    <script>
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));
    </script>
    <div class="fb-post" data-href="https://www.facebook.com/zuck/posts/10102593740125791" data-width="500">
      <div class="fb-xfbml-parse-ignore">
        <blockquote cite="https://www.facebook.com/zuck/posts/10102593740125791">
          <p>February 4 is Facebook&#x2019;s 12th birthday!Our anniversary has a lot of meaning to me as an opportunity to reflect on how...</p>
          Posted by <a href="https://www.facebook.com/zuck">Mark Zuckerberg</a> on&nbsp;
          <a href="https://www.facebook.com/zuck/posts/10102593740125791">
            Tuesday, January 12, 2016
          </a>
        </blockquote>
      </div>
    </div>`;

  const expectedVideo = {
    type: 'facebook',
    embedAs: 'video',
    user: 'MicMedia',
    url: 'https://www.facebook.com/MicMedia/videos/1095905927098863',
    id: '1095905927098863'
  };

  const expectedPost = {
    type: 'facebook',
    embedAs: 'post',
    user: 'zuck',
    url: 'https://www.facebook.com/zuck/posts/10102593740125791',
    id: '10102593740125791'
  };

  t.same(parseInput(videoCode), expectedVideo);
  t.same(parseInput('https://www.facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);
  t.same(parseInput('http://www.facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);
  t.same(parseInput('//www.facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);
  t.same(parseInput('https://facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);
  t.same(parseInput('http://facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);
  t.same(parseInput('//facebook.com/MicMedia/videos/1095905927098863'), expectedVideo);

  t.same(parseInput(postCode), expectedPost);
  t.same(parseInput('https://www.facebook.com/zuck/posts/10102593740125791'), expectedPost);
  t.same(parseInput('http://www.facebook.com/zuck/posts/10102593740125791'), expectedPost);
  t.same(parseInput('//www.facebook.com/zuck/posts/10102593740125791'), expectedPost);
  t.same(parseInput('https://facebook.com/zuck/posts/10102593740125791'), expectedPost);
  t.same(parseInput('http://facebook.com/zuck/posts/10102593740125791'), expectedPost);
  t.same(parseInput('//facebook.com/zuck/posts/10102593740125791'), expectedPost);
});

test('youtube', t => {
  const youtubeCode = tsml`<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/I7IdS-PbEgI"
    frameborder="0" allowfullscreen></iframe>`;

  const expected = {
    type: 'youtube',
    youtubeId: 'I7IdS-PbEgI',
    url: 'https://www.youtube.com/embed/I7IdS-PbEgI'
  };

  t.same(parseInput(youtubeCode), expected);
  t.same(parseInput('https://www.youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('http://www.youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('//www.youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('https://youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('http://youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('//youtube.com/embed/I7IdS-PbEgI'), expected);
  t.same(parseInput('https://www.youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('http://www.youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('//www.youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('https://youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('http://youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('//youtube.com/watch?v=I7IdS-PbEgI'), expected);
  t.same(parseInput('https://youtu.be/I7IdS-PbEgI'), expected);
  t.same(parseInput('http://youtu.be/I7IdS-PbEgI'), expected);
  t.same(parseInput('//youtu.be/I7IdS-PbEgI'), expected);
});

test('twitter', t => {
  const twitterCode = tsml`
    <blockquote class="twitter-tweet" data-lang="en">
      <p lang="en" dir="ltr">High above <a href="
      https://twitter.com/hashtag/lapland?src=hash">#lapland</a> <a href="
      https://twitter.com/hashtag/AuroraBorealis?src=hash">#AuroraBorealis</a> <a href="
      https://twitter.com/ObservingSpace">@ObservingSpace</a> <a href="
      https://twitter.com/OurFinland">@OurFinland</a> <a href="
      https://twitter.com/OnlyInLapland">@OnlyInLapland</a> <a href="
      https://twitter.com/Kachelmann">@Kachelmann</a> <a href="
      https://t.co/1gdqsQxN1K">pic.twitter.com/1gdqsQxN1K</a></p>
      &mdash; Thomas Kast (@thomas_kast) <a href="
      https://twitter.com/thomas_kast/status/709353211455541248">March 14, 2016</a>
    </blockquote>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  const expected = {
    type: 'twitter',
    url: 'https://twitter.com/thomas_kast/status/709353211455541248',
    user: 'thomas_kast',
    id: '709353211455541248'
  };

  t.same(parseInput(twitterCode), expected);
  t.same(parseInput('https://twitter.com/thomas_kast/status/709353211455541248'), expected);
  t.same(parseInput('http://twitter.com/thomas_kast/status/709353211455541248'), expected);
  t.same(parseInput('//twitter.com/thomas_kast/status/709353211455541248'), expected);
  t.same(parseInput('https://www.twitter.com/thomas_kast/status/709353211455541248'), expected);
  t.same(parseInput('http://www.twitter.com/thomas_kast/status/709353211455541248'), expected);
  t.same(parseInput('//www.twitter.com/thomas_kast/status/709353211455541248'), expected);
});

test('tumblr', t => {
  const tumblrCode = tsml`
    <div class="tumblr-post"
      data-href="https://embed.tumblr.com/embed/post/Hj-X2tKsXur2oF91XMwT5w/105825530041"
      data-did="da39a3ee5e6b4b0d3255bfef95601890afd80709">
      <a href="http://insane---world.tumblr.com/post/105825530041">
        http://insane---world.tumblr.com/post/105825530041
      </a>
    </div>
    <script async src="https://secure.assets.tumblr.com/post.js"></script>`;

  const expected = {
    type: 'tumblr',
    url: 'https://embed.tumblr.com/embed/post/Hj-X2tKsXur2oF91XMwT5w/105825530041',
    id: '105825530041'
  };

  t.same(parseInput(tumblrCode), expected);
  t.same(parseInput('https://embed.tumblr.com/embed/post/Hj-X2tKsXur2oF91XMwT5w/105825530041'), expected);
  t.same(parseInput('http://embed.tumblr.com/embed/post/Hj-X2tKsXur2oF91XMwT5w/105825530041'), expected);
  t.same(parseInput('//embed.tumblr.com/embed/post/Hj-X2tKsXur2oF91XMwT5w/105825530041'), expected);
});

test('vine', t => {
  const vineCode = tsml`
    <iframe src="https://vine.co/v/iHTTDHz6Z2v/embed/simple"
      width="600"
      height="600"
      frameborder="0">
    </iframe>
    <script src="https://platform.vine.co/static/scripts/embed.js"></script>`;

  const expected = {
    type: 'vine',
    url: 'https://vine.co/v/iHTTDHz6Z2v/embed/simple',
    id: 'iHTTDHz6Z2v'
  };

  t.same(parseInput(vineCode), expected);
  t.same(parseInput('https://vine.co/v/iHTTDHz6Z2v'), expected);
  t.same(parseInput('https://vine.co/v/iHTTDHz6Z2v/embed'), expected);
  t.same(parseInput('https://vine.co/v/iHTTDHz6Z2v/embed/simple'), expected);
  t.same(parseInput('http://vine.co/v/iHTTDHz6Z2v'), expected);
  t.same(parseInput('http://vine.co/v/iHTTDHz6Z2v/embed'), expected);
  t.same(parseInput('http://vine.co/v/iHTTDHz6Z2v/embed/simple'), expected);
  t.same(parseInput('//vine.co/v/iHTTDHz6Z2v'), expected);
  t.same(parseInput('//vine.co/v/iHTTDHz6Z2v/embed'), expected);
  t.same(parseInput('//vine.co/v/iHTTDHz6Z2v/embed/simple'), expected);
});

test('imgur', t => {
  const imgurCode = tsml`
    <blockquote class="imgur-embed-pub" lang="en" data-id="2GuAESk">
      <a href="//imgur.com/2GuAESk"> If this gets to front page I will draw a ton of imgur doodles for you guys</a>
    </blockquote>
    <script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>`;

  const expected = {
    type: 'imgur',
    url: 'https://imgur.com/2GuAESk',
    id: '2GuAESk'
  };

  t.same(parseInput(imgurCode), expected);
  t.same(parseInput('https://imgur.com/gallery/2GuAESk'), expected);
  t.same(parseInput('http://imgur.com/gallery/2GuAESk'), expected);
  t.same(parseInput('//imgur.com/gallery/2GuAESk'), expected);
  t.same(parseInput('https://imgur.com/2GuAESk'), expected);
  t.same(parseInput('http://imgur.com/2GuAESk'), expected);
  t.same(parseInput('//imgur.com/2GuAESk'), expected);
  t.same(parseInput('https://imgur.com/2GuAESk/embed'), expected);
  t.same(parseInput('http://imgur.com/2GuAESk/embed'), expected);
  t.same(parseInput('//imgur.com/2GuAESk/embed'), expected);
});

test('vimeo', t => {
  const vimeoCode = tsml`
    <iframe src="https://player.vimeo.com/video/35630244?color=ff002f"
      width="500"
      height="281"
      frameborder="0"
      webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    <p><a href="https://vimeo.com/35630244">Red Aurora Australis</a> from <a href="
      https://vimeo.com/terrastro">Alex Cherney</a> on <a href="
      https://vimeo.com">Vimeo</a>.</p>`;

  const expected = {
    type: 'vimeo',
    url: 'https://player.vimeo.com/video/35630244',
    id: '35630244'
  };

  t.same(parseInput(vimeoCode), expected);
  t.same(parseInput('https://player.vimeo.com/video/35630244'), expected);
  t.same(parseInput('http://player.vimeo.com/video/35630244'), expected);
  t.same(parseInput('//player.vimeo.com/video/35630244'), expected);
  t.same(parseInput('https://vimeo.com/35630244'), expected);
  t.same(parseInput('http://vimeo.com/35630244'), expected);
  t.same(parseInput('//vimeo.com/35630244'), expected);
});

test('graphiq', t => {
  const expected = {
    type: 'graphiq',
    url: 'https://w.graphiq.com/w/2iub6zz6ltH',
    id: '2iub6zz6ltH'
  };

  t.same(parseInput('https://graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('http://graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('//graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('https://www.graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('http://www.graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('//www.graphiq.com/wlp/2iub6zz6ltH'), expected);
  t.same(parseInput('https://w.graphiq.com/w/2iub6zz6ltH'), expected);
  t.same(parseInput('http://w.graphiq.com/w/2iub6zz6ltH'), expected);
  t.same(parseInput('//w.graphiq.com/w/2iub6zz6ltH'), expected);
});
