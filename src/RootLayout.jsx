import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Provider } from 'react-redux';
import { store, persiststore } from '../lib/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from './components/ScrollToTop';
const RootLayout = () => {
  return (
    <>
      <Provider store={store}>
        <ScrollToTop />
        <Header />
        <PersistGate persistor={persiststore} loading={null}>
          <main className="">
            <Outlet />
          </main>
        </PersistGate>
      </Provider>
    </>
  );
};

export default RootLayout;
