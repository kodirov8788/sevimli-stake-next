import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BiChevronLeftCircle } from "react-icons/bi";
import { DataContext } from "../../store/GlobalState";
import { getServerSideProps } from "../../pages/index"

const CoolDrinks = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;
  const [product] = useState(props.products);
  const [filteredPr, setFilterdPr] = useState([]);
  // console.log("product >>>", product);
  // console.log("categories >>>", categories);
  console.log("filteredPr >>>", filteredPr);

  useEffect(() => {
    const pr = product.filter(item => item.category === "61db1ba6ccde48158ce7e872")
    setFilterdPr(pr)
  }, [product])
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
      {filteredPr.map(product => (
        <div className="" style={{ display: "flex" }}>
          <img src={product.images[0].url} style={{ width: "100px" }} alt="" />
          <h1>{product.title}</h1>
        </div>
      ))}
    </div>
  );
};
export { getServerSideProps }

export default CoolDrinks;
