import { createContext, useReducer, useState, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const router = useRouter();
  const { locale, asPath } = router;
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: [],
    orders: [],
    users: [],
    categories: [],
    categoryName: "",
    categoryId: null,
    isSearchClick: false,
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth, categoryName, categoryId, categories } = state;
  const homePathName = (asPath === "/")
  useEffect(() => {
    filterSearch({ router, category: categoryId })
  }, [categoryId])
  useEffect(() => {
    let categorys = categories.filter(item => (item._id === categoryId && item.name))
    if (categorys.length !== 0) {
      dispatch({
        type: "CATEGORYNAME",
        payload:
          categorys[0].name
      })
    }
  }, [categoryId, homePathName])
  useEffect(() => {
    if (homePathName === true || categoryId === "" || categoryId === null)
      locale === "en" ?
        dispatch({
          type: "CATEGORYNAME",
          payload:
            "Category"
        }) :
        dispatch({
          type: "CATEGORYNAME",
          payload:
            "kategoriyalar",
        })
  }, [locale, homePathName, categoryName, categoryId]);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }

    getData("categories").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "ADD_CATEGORIES",
        payload: res.categories,
      });
    });
  }, []);

  useEffect(() => {
    const next__kodirov__cart = JSON.parse(
      localStorage.getItem("next__kodirov__cart")
    );

    if (next__kodirov__cart)
      dispatch({ type: "ADD_CART", payload: next__kodirov__cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("next__kodirov__cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });

      if (auth.user.role === "admin") {
        getData("user", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });

          dispatch({ type: "ADD_USERS", payload: res.users });
        });
      }
    } else {
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "ADD_USERS", payload: [] });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
