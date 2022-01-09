import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AboutSidebar = () => {
  const [routerClick, setRouterClick] = useState("products");
  // useEffect(() => {}, [routerClick]);
  console.log("RouterClick", routerClick);
  const router = useRouter();
  return (
    <div className="about__page">
      <h1>Our Services</h1>
      <div
        className={
          routerClick !== "products"
            ? "about__listItem__container short "
            : "about__listItem__container"
        }
      >
        <li onClick={() => setRouterClick("products")}>
          <Link href="/products/hotdrinks">
            <a
              className={
                router.pathname.includes("/hotdrinks") && "Sidebar__activeItem"
              }
            >
              Hot Drinks
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "products" && "about__listItem"}
          onClick={() => setRouterClick("products")}
        >
          <Link href="/products/cooldrinks">
            <a
              className={
                router.pathname.includes("/cooldrinks")
                  ? "Sidebar__activeItem"
                  : ""
              }
            >
              Cool Drinks
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "products" && "about__listItem"}
          onClick={() => setRouterClick("products")}
        >
          <Link href="/products/mineraldrinks">
            <a
              className={
                router.pathname.includes("/products/mineraldrinks") &&
                "Sidebar__activeItem"
              }
            >
              Mineral Drinks
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "products" && "about__listItem"}
          onClick={() => setRouterClick("products")}
        >
          <Link href="/products/cakes">
            <a
              className={
                router.pathname.includes("/products/cakes") &&
                "Sidebar__activeItem"
              }
            >
              Cakes
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "products" && "about__listItem"}
          onClick={() => setRouterClick("products")}
        >
          <Link href="/products/localfood">
            <a
              className={
                router.pathname.includes("/products/localfood") &&
                "Sidebar__activeItem"
              }
            >
              Local Food
            </a>
          </Link>
        </li>
        <li
          className={routerClick !== "products" && "about__listItem"}
          onClick={() => setRouterClick("products")}
        >
          <Link href="/products/fastfood">
            <a
              className={
                router.pathname.includes("/products/fastfood") &&
                "Sidebar__activeItem"
              }
            >
              Fast Food
            </a>
          </Link>
        </li>
      </div>

    </div>
  );
};

export default AboutSidebar;
