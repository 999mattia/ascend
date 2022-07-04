import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Header from "../components/Header";
import { SSRProvider } from "@react-aria/ssr";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <SessionProvider>
        <Header />
        <ScrollToTop />
        <Component {...pageProps} />
        <Footer/>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp;
