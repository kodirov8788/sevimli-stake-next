/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__section">
        <ul className="About">
          <h2>About us</h2>
          <li>
            <Link href="/about/aboutus">
              <a>About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/about/connect">
              <a>How to connect us</a>
            </Link>
          </li>
          <li>
            <Link href="/about/delevery">
              <a>Delevery</a>
            </Link>
          </li>
          <li>
            <Link href="/about/services">
              <a>Our services</a>
            </Link>
          </li>
        </ul>

        {/* <ul className="Shop">
          <h2>Shop by</h2>
          <li>
            <a href="#">New Arrival</a>
          </li>
          <li>
            <a href="#">Best Seller</a>
          </li>
          <li>
            <a href="#">Features Product</a>
          </li>
          <li>
            <a href="#">Sale Off</a>
          </li>
        </ul> */}

        <ul className="Support">
          <h2>Support</h2>
          <li>
            <Link href="/about/blog">
              <a>The blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about/faqs">
              <a>FAQs</a>
            </Link>
          </li>
          <li>
            <Link href="/about/ordertraking">
              <a>The order traking</a>
            </Link>
          </li>
          <li>
            <Link href="/about/shipping">
              <a>Shipping</a>
            </Link>
          </li>
        </ul>
        <ul className="Address">
          <h2>Address</h2>
          <li>
            <Link href="/about/office">
              <a>Office address</a>
            </Link>
          </li>
          <li>
            <Link href="/about/production">
              <a>Production address</a>
            </Link>
          </li>
          <li>
            <Link href="/about/number">
              <a>Phone number</a>
            </Link>
          </li>
        </ul>

        <div className="payment">
          <h2>Payment</h2>
          <div className="payment__imgs">
            <img
              src="https://docs.click.uz/wp-content/themes/click_help/assets/images/logo.png"
              alt=""
            />
            <img
              src="https://cdn.paycom.uz/documentation_assets/payme_01.png"
              alt=""
            />
            <img
              src="/assets/uzcard.svg"
              alt=""
              style={{ marginTop: "10px" }}
            />
            <img
              src="https://www.fibernet.uz/wp-content/uploads/apelsin-logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
