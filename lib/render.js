import * as image from './types/image';
import * as video from './types/video';
import * as youtube from './types/youtube';
import * as twitter from './types/twitter';
import * as instagram from './types/instagram';
import * as facebook from './types/facebook';
import * as vine from './types/vine';
import * as custom from './types/custom';

const types = {
  image, video, youtube, twitter, instagram, facebook, vine, custom
};

export default opts => types[opts.type] ? types[opts.type].render(opts) : '';
