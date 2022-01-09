/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import filterSearch from "../utils/filterSearch";
import { useRouter } from "next/router";
import { BsThreeDots } from "react-icons/bs";
import { DataContext } from "../store/GlobalState";
import en from "../locales/en";
import uz from "../locales/uz";
const Category = () => {
  const { state, dispatch } = useContext(DataContext);
  const { categories, categoryName, categoryId } = state;
  // console.log("cate categoryName >>>:", categoryName);
  const router = useRouter();
  const { locale, pathname, asPath } = router;
  const t = locale === "en" ? en : uz;
  const [status, setStatus] = useState(false);
  const [categoryNames, setCategoryName] = useState("");
  // const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    locale === "en"
      ? setCategoryName("Category")
      : setCategoryName("kategoriyalar")
  }, [locale]);
  // const click = () => {
  //   filterSearch({ router, category: null });
  //   router.push({ pathname: '/' });
  // };
  let x = "? category ="
  // const sensor = () => {
  //   if (!asPath.includes('/?category') || asPath !== "/" || asPath !== "/?category=" || asPath !== "/?search=all&category")
  //     router.push({ pathname: '/' });
  // };
  return (
    <>
      <div
        className="task__adderSelect"
        onMouseEnter={() => setStatus(true)}
        onMouseLeave={() => setStatus(false)}
      >
        <p> {categoryName === "" ? categoryNames : categoryName} </p>
        <div className={status ? "task__adderStatus" : "hide__status"}>
          <li className="status" onClick={() => router.push({ pathname: '/' })
            + filterSearch({ router, category: null })}
            onMouseEnter={() => setStatus(true)}
            onMouseLeave={() => setStatus(false)}>
            <p>All</p>
            <div className={`${categoryName === "Category" || categoryName === "kategoriyalar" ? "signal" : ""}`}></div>
          </li>

          {categories.map((item) => (
            <div
              href="/"
              className="status"
              onMouseEnter={() => setStatus(true)}
              onMouseLeave={() => setStatus(false)}
              onClick={() =>
                // setCategoryName(item.name) +
                // setCategoryId(item._id) +
                // sensor() +
                dispatch({
                  type: "CATEGORYID",
                  payload: item._id,
                })
                // filterSearch({ router, category: item._id })
              }
              key={item._id}
              value={item._id}
            >
              <p>{item.name}</p>
              {categoryName === item.name ? <b className="signal"></b> : ""}
            </div>
          ))}
        </div>
        <BsThreeDots />
      </div>
    </>
  );
};

export default Category;
