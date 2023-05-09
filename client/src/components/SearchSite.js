function SearchSite(props) {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <form
      id="searchForm"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="formName"
      className="center"
    >
      <label>
        <span>Search By Name: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleChange}
        />
      </label>
    </form>
  );
}

export default SearchSite;
