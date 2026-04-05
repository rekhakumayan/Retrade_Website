import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import Providers from "./providers";
import Header from "@/sharedComponents/Header/Header";
import Footer from "@/sharedComponents/Footer/Footer";
import { Suspense } from "react";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
           <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main style={{ flex: 1 }}>
            {children}
          </main>
           <Footer />
        </Providers>
      </body>
    </html>
  );
}
