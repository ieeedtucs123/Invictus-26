import { useState, useEffect, use } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import CommonLotus from "@/utils/commonLotus";
import LandingFigure from "@/utils/landingFigure";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const [lotusStyle, setLotusStyle] = useState({});
  const [lotusClass, setLotusClass] = useState(
    "top-0 left-0 w-[180px] opacity-100 hidden"
  );
  const [figureStyle,setFigureStyle] = useState({});
  const [figureClass, setFigureClass] = useState(
    "top-0 left-0 w-[180px] opacity-100"
  );
  const router = useRouter();

  const [displayNavbar, setDisplayNavbar] = useState(false);

  useEffect(() => {
    if (router.pathname !== "/Home") {
      setDisplayNavbar(true);
      return;
    }

    const handleScroll = () => { setDisplayNavbar(window.scrollY > 150); };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [router.pathname]);
      

  return (
    <>
    <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`}
        strategy="beforeInteractive"
      />
    <AuthProvider>
      
      {router.pathname === '/model' || !displayNavbar ? null : <Navbar className={`fixed top-0 left-0 w-full z-50 transform 
      transition-transform transition-opacity duration-300 ${displayNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`} />}
      {router.pathname === '/model' ? null : <CommonLotus className={lotusClass} style={lotusStyle} />}
      {router.pathname === '/model' ? null : <LandingFigure className={figureClass} style={figureStyle} />}

      <Component {...pageProps} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
    </AuthProvider>

    </>
  );
}
