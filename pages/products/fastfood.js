import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";
import { DataContext } from "../../store/GlobalState";
import { getServerSideProps } from "../../pages/index"
import ProductItem from "../../components/product/ProductItem";


const FastFood = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;
  const [products, setProducts] = useState(props.products);
  const [filteredPr, setFilterdPr] = useState([]);
  // console.log("product >>>", product);
  console.log("categories >>>", categories);
  console.log("filteredPr >>>", filteredPr);
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);


  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  useEffect(() => {
    const pr = products.filter(item => item.category === "61db1c16ccde48158ce7e877")
    setFilterdPr(pr)
  }, [products])
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
  );
};
export { getServerSideProps }
export default FastFood;
