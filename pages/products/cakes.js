import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";
import { DataContext } from "../../store/GlobalState";
import { getServerSideProps } from "../../pages/index"
import ProductItem from "../../components/product/ProductItem";

const Cakes = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;
  const [products, setProducts] = useState(props.products);

  const [filteredPr, setFilterdPr] = useState([]);
  // console.log("product >>>", product);
  // console.log("categories >>>", categories);
  console.log("filteredPr >>>", filteredPr);
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    const pr = products.filter(item => item.category === "61db1db7ccde48158ce7e878")
    setFilterdPr(pr)
  }, [products])

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  return (
    <div className="about__container">
      <li>
        <Link href="/">
          <a>
            <BiChevronLeftCircle />
            <span>Back</span>
          </a>
        </Link>
      </li>
      {/* {filteredPr.map(product => (
        <div className="" style={{ display: "flex" }}>
          <img src={product.images[0].url} style={{ width: "100px" }} alt="" />
          <h1>{product.title}</h1>
        </div>
      ))} */}
      <div className="products">
        {filteredPr.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          filteredPr.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        )}
      </div>

    </div>
  );
};
export { getServerSideProps }
export default Cakes;
