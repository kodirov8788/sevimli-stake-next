import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import en from "../locales/en";
import uz from "../locales/uz";
const Register = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : uz;
  const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div>
      <Head>
        <title>{t.Register__Page}</title>
      </Head>

      <form
        className="signin__formContainer"
        // style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">{t.Name}</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="exampleInputPassword2">{t.Confirm__Password}</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="signin__btn">
          {t.Register}
        </button>

        <p className="my-2">
          {t.Already__have}{" "}
          <Link href="/signin">
            <a style={{ color: "crimson" }}>{t.Login__Now}</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
