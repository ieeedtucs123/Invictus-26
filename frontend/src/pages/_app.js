import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div ><Navbar /></div>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
