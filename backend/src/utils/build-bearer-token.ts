export const buildBearerToken = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
