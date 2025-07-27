export const getCollectionIdFromPath = () => {
  const params = new URLSearchParams(document.location.search);

  if (!params.has('collection')) {
    return import.meta.env.VITE_DEFAULT_COLLECTION;
  } else {
    return params.get('collection');
  }
};
