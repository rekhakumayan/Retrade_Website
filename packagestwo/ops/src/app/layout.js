'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '@/styles/variables.css';
import '@/styles/typography.css';
import Header from '@/sharedComponents/Header/Header';
import Sidebar from '@/sharedComponents/Sidebar/Sidebar';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { PersistGate } from "redux-persist/integration/react";
import { useState } from 'react';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage =
  pathname === '/login' ||
  pathname.startsWith('/password') ||
  pathname.startsWith('/set-password'); 

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {isAuthPage ? (
        children
      ) : (
        <>
          <Header toggleSidebar={toggleSidebar} />

          <div className="d-flex">

            <Sidebar
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
            />

            <div className="flex-grow-1 page-scroll">
              {children}
            </div>

          </div>
    </>
  )
}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LayoutContent>{children}</LayoutContent>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}