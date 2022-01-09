import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import MediaFooter from "./MediaFooter";
import AboutSidebar from "./AboutSidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import CartChange from "./CartChange";

function Layout({ children }) {
  const [route, setRoute] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes("about")) {
      setRoute(true);
    } else {
      setRoute(false);
    }
  }, [router]);

  // console.log("Router", route);
  return (
    <div>
      <NavBar />
      <Notify />
      <Modal />
      {/* {route && <AboutSidebar />} */}
      <AboutSidebar />
      {/* <LanguageSelect /> */}
      <CartChange />
      {children}
    </div>
  );
}

export default Layout;
