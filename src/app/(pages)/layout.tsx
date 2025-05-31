'use client'
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';
import '../offerTabs.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { store } from "@/store";
import { Provider } from 'react-redux';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Provider store={store}>
      <Header/>
      {children}
      <Footer/>
      </Provider>
    </>
  );
}
