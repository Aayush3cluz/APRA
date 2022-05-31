export const getmaxPages = (totalCount: number | undefined) => {
  if (totalCount)
    return Math.floor(totalCount / 4) + (totalCount % 4 === 0 ? 0 : 1);
  return 1;
};
