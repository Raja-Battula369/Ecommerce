import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import RootLayout from './RootLayout';
import Signup from './components/form/Signup';
import RouterProtecter from './RouterProtecter';
import Signin from './components/form/Signin';

import ForgotPassword from './components/form/Forgetpassword';
import ChangePassword from './components/form/ChangePassword';
import Home from './components/Home/Home';
import ProductDetails from './components/Products/ProductDetails';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset/:id/:token" element={<ChangePassword />} />

        <Route element={<RouterProtecter />}>
          <Route index element={<Home />} />
          <Route path="/product/:productid" element={<ProductDetails />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
