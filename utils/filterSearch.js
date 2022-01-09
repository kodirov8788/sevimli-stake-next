const filterSearch = ({ router, category, sort, search }) => {
  const path = router.pathname;
  const query = router.query;
  if (category) query.category = category;
  router.push({
    pathname: path,
    query: query,
  });
};

export default filterSearch;
