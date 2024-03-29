import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/product/ProductItem";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
// import Link from "next/link";
import en from "../locales/en";
import uz from "../locales/uz";
const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;
  // console.log("categories", categories);
  // console.log("products", products);

  const { locale, pathname } = router;
  const t = locale === "en" ? en : uz;


  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Delete all selected products?",
          type: "DELETE_PRODUCT",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  return (
    <div className="home__page">
      <Head>
        <title>Home Page</title>
      </Head>
      <button onClick={() => router.push({ pathname: '/products/cakes' })}>Products cakes</button>

      {auth.user && auth.user.role === "admin" && (
        <div
          className="delete_all btn btn-danger mt-2"
          style={{ marginBottom: "-10px" }}
        >
          <input
            type="checkbox"
            checked={isCheck}
            onChange={handleCheckALL}
            style={{
              width: "25px",
              height: "25px",
              transform: "translateY(8px)",
            }}
          />
          <button
            className="btn btn-danger ml-2"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleDeleteAll}
          >
            DELETE ALL
          </button>
        </div>
      )}


      <div className="products">
        {/* {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        )} */}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
