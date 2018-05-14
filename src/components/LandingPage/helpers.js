export const parseAuthParams = (params) => {
  const authParams = new URLSearchParams(params);

  let parsed = {};

  // Display the key/value pairs
  for (let pair of authParams.entries()) {
    parsed[pair[0]] = pair[1];
  }

  return parsed;
};
