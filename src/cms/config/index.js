import collections from './collections';

const config = {
  local_backend: true,
  load_config_file: false,
  backend: {
    name: 'github',
    repo: 'vstanyshevskyy/obobruiko',
    branch: 'main'
  },
  media_folder: 'static/assets/uploads',
  public_folder: '/assets/uploads',
  publish_mode: 'editorial_workflow',
  collections
};

export default config;
