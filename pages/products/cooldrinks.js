import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";
import { DataContext } from "../../store/GlobalState";
import { getServerSideProps } from "../../pages/index"
import ProductItem from "../../components/product/ProductItem";


const CoolDrinks = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;
  const [products, setProducts] = useState(props.products);
  const [filteredPr, setFilterdPr] = useState([]);
  // console.log("product >>>", product);
  // console.log("categories >>>", categories);
  console.log("filteredPr >>>", filteredPr);

  useEffect(() => {
    const pr = products.filter(item => item.category === "61db1ba6ccde48158ce7e872")
    setFilterdPr(pr)
  }, [products])
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);


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

export default CoolDrinks;
