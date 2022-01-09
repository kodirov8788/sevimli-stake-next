import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import en from "../locales/en";
import uz from "../locales/uz";
const Signin = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : uz;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div>
      <Head>
        <title>{t.Sign__in__Page}</title>
      </Head>

      <form className="signin__formContainer" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">{t.Email__address}</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            {t.email__security}
          </small>
        </div>
        {/* <div className="form-group">
          <label htmlFor="cart">car</label>
          <input
            type="text"
            className="form-control"
            id="cart1"
            name="cart"
            value={cart}
            onChange={handleChangeInput}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">{t.Password}</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="signin__btn">
          {t.Sign__in__Page}
        </button>

        <p className="my-2">
          {t.not__have__account}{" "}
          <Link href="/register">
            <a style={{ color: "crimson" }}>{t.Register__Now}</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
