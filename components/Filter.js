import React, { useState } from "react";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";

const Filter = () => {
  const [sort, setSort] = useState("");
  const router = useRouter();
  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  return (
    <div className="filter__filter">
      <div className="">
        <select
          className="Filter_select"
          value={sort}
          onChange={handleSort}
        >
          <option value="-createdAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: Hight-Low</option>
          <option value="price">Price: Low-Hight</option>
        </select>
      </div>
    </div >
  );
};

export default Filter;
