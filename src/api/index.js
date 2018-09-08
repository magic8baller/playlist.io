import auth from './auth';
import playlists from './playlists';
import search from './search';
import favorites from './favorites';

export default {
  ...auth,
  ...playlists,
  ...search,
  ...favorites
};
