import auth from './auth';
import playlists from './playlists';
import search from './search';

export default {
  ...auth,
  ...playlists,
  ...search
};
