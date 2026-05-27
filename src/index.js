import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import ExchangeDateScreen from './screens/ExchangeDateScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PrivateRoute from './components/PrivateRoute';
import ProfileScreen from './screens/ProfileScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomeScreen />} />
            <Route path='product/:id' element={<ProductScreen />} />
            <Route path='cart' element={<CartScreen />} />
            <Route path='login' element={<LoginScreen />} />
            <Route path='register' element={<RegisterScreen />} />

            <Route path='' element={<PrivateRoute />}>
              <Route path='profile' element={<ProfileScreen />} />
              <Route path='exchange-date' element={<ExchangeDateScreen />} />
              <Route path='shipping' element={<ShippingScreen />} />
              <Route path='payment' element={<PaymentScreen />} />
              <Route path='placeorder' element={<PlaceOrderScreen />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
