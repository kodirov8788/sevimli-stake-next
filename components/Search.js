import React, { useContext, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { DataContext } from "../store/GlobalState";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";

const Search = () => {
  const { state, dispatch } = useContext(DataContext);
  const { isSearchClick, cart } = state;
  // console.log("isSearchClick", isSearchClick);

  const router = useRouter();
  const [search, setSearch] = useState("");
  //   const { state, dispatch } = useContext(DataContext);
  useEffect(() => {
    if (search) {
      filterSearch({ router, search: search ? search.toLowerCase() : "all" });
    }
    if (search !== "") {
      dispatch({
        type: "SEARCHCLICK",
        payload: {
          isSearchClick: true
        },
      });
    } else {
      dispatch({
        type: "SEARCHCLICK",
        payload: {
          isSearchClick: false
        },
      });
    }
  }, [search]);
  // console.log("search", search);



  const hundleBtn = (e) => {
    e.preventDefault();
    setSearch("");
  };
  return (
    <form autoComplete="on" className="search__form">
      <input
        type="text"
        list="title_product"
        value={search.toLowerCase()}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={hundleBtn}>
        <FiSearch />
      </button>
    </form>
  );
};

export default Search;
