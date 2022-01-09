/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import axios from "axios";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import en from "../../locales/en";
import uz from "../../locales/uz";

const DetailProduct = (props) => {
  const router = useRouter();
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };
  console.log("product >>>", product);
  // const [data, setData] = useState([]);
  const { locale } = router;
  const t = locale === "en" ? en : uz;

  // console.log("cart >>>", cart);
  return (<>   <Head>
    <title>{t.title}</title>
  </Head>
    <div className="row detail_page">
      {product.category === "618380c46eab0893e95cbb1d" ? (
        <div className="product_video">
          <ReactPlayer
            url={product.video[0].video_1}
            width="80%"
            height="400px"
            playing={false}
            playIcon={<button>Play</button>}
            controls={true}

            config={{
              file: {
                attributes: {
                  preload: "auto",
                  controlsList: 'nodownload'  //<- this is the important bit
                }
              }
            }}
          />
        </div>
      ) : (
        <div className="col-md-5 ml-2">
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className="d-block img-thumbnail  rounded mt-4 w-100"
            style={{
              height: "350px",
              objectFit: "cover",
              objectPosition: "center",
            }}
            onEnded={() => this.onEnded()}
          />
          <div className="row ml-1" style={{ cursor: "pointer" }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.url}
                className={`img-thumbnail rounded ${isActive(index)}`}
                style={{ height: "80px", width: "20%" }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="col-md-5 m-1 ">
        <h2 className="text-uppercase">{product.title}</h2>
        <h5 className="text-danger">
          {t.price}: ${product.price}
        </h5>

        <div className="row mx-0 d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-danger">
              {t.InStock}: {product.inStock}
            </h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
          {/* 
          <h6 className="text-danger">
            {t.sold}: {product.sold}
          </h6> */}
        </div>

        <div className="my-2">{product.description}</div>
        <div className="my-2">{product.content}</div>

        <button
          type="button"
          className="productDetail__buyBtn"
          onClick={() => dispatch(addToCart(product, cart))}
        >
          {t.productBtn}
        </button>
      </div>
    </div></>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailProduct;
