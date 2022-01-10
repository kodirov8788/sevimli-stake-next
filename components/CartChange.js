/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import en from "../locales/en";
import uz from "../locales/uz";
const CartChange = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : uz;
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  console.log("cart section >>>", cart);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("next__kodirov__cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, video_1,
            video_2,
            video_3, video, images, price, book, inStock, sold } =
            res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              video,
              video_1,
              video_2,
              video_3,
              book,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const handleOrder = async () => {
    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: t.cart__error,
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("order", { address, mobile, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_CART", payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  if (cart.length === 0)
    return (
      <img
        style={{ objectPosition: "center", objectFit: "contain" }}
        className="img-responsive w-100"
        src="/shopping.jpeg"
        alt="not empty"
      />
    );

  return (
    <div className="">
      <Head>
        <title>{t.cart_page}</title>
      </Head>

      <div className="">
        <h2>{t.shopping__cart}</h2>

        <div className="">
          <div>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-[#000]">
        <h3>
          {t.total}: <span className="">${total}</span>
        </h3>

        <Link href={auth.user ? "#!" : "/signin"}>
          <a className="btn btn-dark " onClick={handleOrder}>
            {t.cart__order}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartChange;
