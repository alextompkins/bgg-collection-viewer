const ENDPOINTS = {
  collection: (id: string) => `${process.env.DEPLOY_PRIME_URL}/api/collection/${id}`,
};

export async function getCollection(collectionId: string) {
  const response = await fetch(ENDPOINTS.collection(collectionId));
  return await response.json();
}
