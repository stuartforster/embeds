const allowed = [
  [/(https?:)?\/\/(www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/, match => {
    const id = match[3];
    return {
      type: 'instagram',
      text: '',
      url: `https://www.instagram.com/p/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?giphy\.com\/embed\/([A-Za-z0-9_-]+)/, match => {
    const id = match[3];
    return {
      type: 'giphy',
      text: '',
      url: `https://giphy.com/embed/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?facebook\.com\/([A-Za-z0-9_-]+)\/(videos|posts)\/([0-9]+)/, match => {
    const user = match[3];
    const type = match[4];
    const id = match[5];
    const embedAs = type === 'videos' ? 'video' : 'post';
    return {
      type: 'facebook',
      embedAs: embedAs,
      user: user,
      url: `https://www.facebook.com/${user}/${type}/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?twitter\.com\/([A-Za-z0-9_-]+)\/status\/([0-9]+)/, match => {
    const user = match[3];
    const id = match[4];
    return {
      type: 'twitter',
      user: user,
      url: `https://twitter.com/${user}/status/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?youtube\.com\/(embed\/|watch\?v=)([A-Za-z0-9_-]+)/, match => {
    const id = match[4];
    return {
      type: 'youtube',
      youtubeId: id,
      url: `https://www.youtube.com/embed/${id}`
    };
  }],
  [/(https?:)?\/\/(www\.)?youtu\.be\/([A-Za-z0-9_-]+)/, match => {
    const id = match[3];
    return {
      type: 'youtube',
      youtubeId: id,
      url: `https://www.youtube.com/embed/${id}`
    };
  }],
  [/(https?:)?\/\/embed\.tumblr\.com\/embed\/post\/([A-Za-z0-9_-]+)\/([0-9]+)/, match => {
    const key = match[2];
    const id = match[3];
    return {
      type: 'tumblr',
      url: `https://embed.tumblr.com/embed/post/${key}/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?vine\.co\/v\/([A-Za-z0-9_-]+)/, match => {
    const id = match[3];
    return {
      type: 'vine',
      url: `https://vine.co/v/${id}/embed/simple`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.)?imgur\.com\/(gallery\/)?([A-Za-z0-9_-]+)/, match => {
    const id = match[4];
    return {
      type: 'imgur',
      url: `https://imgur.com/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(www\.|w\.)?graphiq\.com\/(wlp|w)\/([A-Za-z0-9_-]+)/, match => {
    const id = match[4];
    return {
      type: 'graphiq',
      url: `https://w.graphiq.com/w/${id}`,
      id: id
    };
  }],
  [/(https?:)?\/\/(player\.)?vimeo\.com\/(video\/)?([0-9]+)/, match => {
    const id = match[4];
    return {
      type: 'vimeo',
      url: `https://player.vimeo.com/video/${id}`,
      id: id
    };
  }]
];

export default function (url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  for (let i = 0; i < allowed.length; ++i) {
    const [regex, fn] = allowed[i];
    const match = url.match(regex);
    if (!match) {
      continue;
    }

    return fn(match);
  }

  return null;
}
