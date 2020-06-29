import collections from './collections';

const config = {
  local_backend: true,
  load_config_file: false,
  backend: {
    name: 'github',
    repo: 'vstanyshevskyy/obobruiko',
    branch: 'draft'
  },
  media_folder: 'static/assets/uploads',
  public_folder: '/assets/uploads',
  collections
};

export default config;
