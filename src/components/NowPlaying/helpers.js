import { isNil } from 'ramda';

export const randomPicEndpoint = 'https://source.unsplash.com/user/tentides/452x452/?wallpaper';

export const getUri = ({ uri }) => uri;

export const pageIsLoading = (currentPlaylist) => isNil(currentPlaylist);
