export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "all") {
      query.append(key, value);
    }
  });
  return query.toString();
};