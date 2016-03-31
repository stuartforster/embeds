# embeds

A javascript module to parse and render embeds - such as images, video, youtube, facebook etc.

Can be used in the browser (through browserify) and node.js.

## Installation

```shell
npm install embeds --save
```

## Usage/example

The following is an example, using embeds together with [query-dom](https://www.npmjs.com/package/query-dom) so that it can be run in node.js

When used in the browser, a browser DOM element can be used instead.

```js
import {parse} from 'embeds';
import queryDom from 'query-dom';

// embed code for an embed, in this example a simple youtube embed.
// see all supported embeds further down
const embedCode = '<iframe src="https://www.youtube.com/embed/pDVmldTurqk"></iframe>';
const parsed = parse(queryDom(embedCode));
```

You can also parse input, such as a url.

```js
import {parseInput} from 'embeds';

const parsed = parseInput('https://www.youtube.com/embed/pDVmldTurqk');
```

For more examples, please see the [tests](https://github.com/micnews/embeds/tree/master/test).
