import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
  // import { clearCurrentProfile } from './actions/profileActions';


import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreateProfilePage from './pages/CreateProfilePage'
import EditProfilePage from './pages/EditProfilePage';


import AddEducationPage from './pages/addEditCredentials/AddEducationPage';
import AddExperiencePage from './pages/addEditCredentials/AddExperiencePage';
import EditEducationPage from './pages/addEditCredentials/EditEducationPage';

import ProfilePage from './pages/profiles/ProfilePage';
import PostsPage from './pages/posts/PostsPage';
import ProductsPage from './pages/products/ProductsPage';

import ProductPage from './pages/products/ProductPage';
import CartPage from './pages/cart/CartPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faThumbsUp, faEllipsisH, faIgloo, faUserFriends,faLaptopCode,faUserAstronaut, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import ThankYouPage from './pages/thankyou/ThankYouPage';
import UserOrdersPage from './pages/orders/UserOrdersPage';
import UserOrderPage from './pages/orders/UserOrderPage';

import './sass/main.scss';





library.add(faEnvelope, faKey, faThumbsUp,faEllipsisH, faIgloo, faUserFriends, faLaptopCode, faUserAstronaut, faTimesCircle);


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
       // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store = {store}>
      <Router>
        <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />

          <PrivateRoute exact path="/create-profile" component={CreateProfilePage} />
          <PrivateRoute exact path="/edit-profile" component={EditProfilePage} />

          <PrivateRoute exact path="/add-education" component={AddEducationPage} />
          <PrivateRoute exact path="/edit-education" component={EditEducationPage} />
          <PrivateRoute exact path="/add-experience" component={AddExperiencePage} />
          <PrivateRoute exact path="/thank-you" component={ThankYouPage} />
          <PrivateRoute exact path="/orders" component={UserOrdersPage} />
          <PrivateRoute exact path="/order/:id" component={UserOrderPage} />
        
          <Route exact path = "/login" component = {LoginPage}/>
          <Route exact path = "/posts" component = {PostsPage}/>
          <Route exact path = "/products" component = {ProductsPage}/>
          <Route exact path = "/cart" component = {CartPage}/>
          <Route exact path = "/products/:id" component = {ProductPage}/>
          <Route exact path = "/profile/:handle" component = {ProfilePage}/>
          <Route exact path = "/register" component = {RegisterPage}/>
          <Route exact path = "/" component = {HomePage}/>
        </Switch>
        </React.Fragment>
      </Router>
    </Provider>
        
      
    );
  }
}

export default App;
